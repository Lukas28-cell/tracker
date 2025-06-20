const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateTrackingNumber = require('../utils/generateTracking');

exports.createPackage = async (req, res) => {
  console.log("🔐 Authenticated package creation hit with:", req.body);

  try {
    const {
      sender,
      recipient,
      origin,
      destination,
      service,
      carrier,
      physicalWeight,
      dimensions
    } = req.body;

    const { length, width, height } = dimensions || {};

   
    if (
      !sender || !recipient || !origin || !destination || !service ||
      !carrier || !physicalWeight || isNaN(length) || isNaN(width) || isNaN(height)
    ) {
      return res.status(400).json({ message: "Missing or invalid input fields." });
    }

    const trackingNumber = generateTrackingNumber();
    const volumetricWeight = (length * width * height) / 5000;
    const finalWeight = Math.max(physicalWeight, volumetricWeight);

    let weightCategory = "";
    if (finalWeight <= 25) weightCategory = "standard";
    else if (finalWeight <= 50) weightCategory = "premium";
    else weightCategory = "freight";

    const shippingCost = finalWeight * 1000;

    const newPackage = await prisma.package.create({
      data: {
        trackingNumber,
        sender,
        recipient,
        origin,
        destination,
        service,
        carrier,
        physicalWeight,
        volumetricWeight,
        finalWeight,
        weightCategory,
        shippingCost,
        currentLocation: origin,
        dimensions: {
          length: Number(length),
          width: Number(width),
          height: Number(height)
        },
        history: [
          {
            status: "created",
            timestamp: new Date(),
            location: origin,
            notes: `Package created (${carrier}, ${physicalWeight}kg)`
          }
        ]
      }
    });

res.status(201).json({
  message: "Package created",
  data: {
    trackingNumber,
    status: newPackage.status,
    shippingCost
  }
});

  } catch (err) {
    console.error("❌ Error creating package:", err);
    res.status(500).json({ message: "Failed to create package", error: err.message });
  }
};

exports.getPackage = async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const found = await prisma.package.findUnique({
      where: { trackingNumber }
    });
    if (!found) return res.status(404).json({ message: 'Not found' });
    res.json(found);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const { status, location } = req.body;

    const pkg = await prisma.package.findUnique({ where: { trackingNumber } });
    if (!pkg) return res.status(404).json({ message: 'Not found' });

    const updatedHistory = Array.isArray(pkg.history) ? pkg.history : JSON.parse(pkg.history);
    const updateRecord = {
      status,
      timestamp: new Date(),
      location,
      notes: `Status updated to ${status} at ${location}`
    };
    updatedHistory.push(updateRecord);
 
    const updated = await prisma.package.update({
      where: { trackingNumber },
      data: {
        status,
        currentLocation: location,
        history: updatedHistory
      }
    });

    res.json({ message: "Status updated", updated: updateRecord });
  } catch (err) {
    console.error("❌ Error updating status:", err);
    res.status(500).json({ error: err.message });
  }
};
