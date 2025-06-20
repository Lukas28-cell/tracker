-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "dimensions" JSONB NOT NULL,
    "physicalWeight" DOUBLE PRECISION NOT NULL,
    "volumetricWeight" DOUBLE PRECISION NOT NULL,
    "finalWeight" DOUBLE PRECISION NOT NULL,
    "weightCategory" TEXT NOT NULL,
    "carrier" TEXT NOT NULL,
    "shippingCost" DOUBLE PRECISION NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'created',
    "history" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Package_trackingNumber_key" ON "Package"("trackingNumber");
