require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const adminRoutes = require('./src/routes/adminRoutes');

const packageRoutes = require('./src/routes/packageRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/hello', (req, res) => {
    console.log("✅ /api/hello route hit");
  res.json({ message: 'Hello from server' });
});


   



app.get('/track/:trackingNumber', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'track.html'));
});




app.use('/api', packageRoutes);





const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
