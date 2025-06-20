const bcrypt = require('bcryptjs');

const password = "123456";    // LUCAS FOR HERE YOU FIT CHANGE AM TO ANY ADMIN PASSWORD YOU WANT. 

bcrypt.hash(password, 10).then(hash => {
  console.log("✅ New hashed password:", hash);
});
  