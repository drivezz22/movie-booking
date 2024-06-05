const bcrypt = require("bcryptjs");
const password = bcrypt.hashSync("123456");
console.log(password);

module.exports.userData = [
  {
    email: "admin@mail.com",
    phone: "1234567890",
    password: password,
    name: "IamAdmin",
    isAdmin: true,
  },
];
