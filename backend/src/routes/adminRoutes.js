const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const SECRET = process.env.JWT_SECRET || "b8acf628eff2c049369fc14898c0dd173a76b1bcce75b97fcc78c527e3be91d4";

router.post('/login', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
 
  try {
    if (!ADMIN_PASSWORD_HASH) {
      console.error("ADMIN_PASSWORD_HASH is not set!");
      console.log("Loaded ADMIN_PASSWORD_HASH:", ADMIN_PASSWORD_HASH);

      return res.status(500).json({ message: "Server config error" });
    }

    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (isMatch) {
      const token = jwt.sign({ role: "admin" }, SECRET, { expiresIn: '1d' });
      console.log("Login attempt with password:", password);

      return res.json({ message: "Login successful", token });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
