const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function login(req, res) {
  const { password } = req.body;

  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
 
  const isMatch = await bcrypt.compare(password, adminPasswordHash);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '1d',   
  });

  res.json({ token });
}
