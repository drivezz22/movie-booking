const bcrypt = require("bcryptjs");
const password = bcrypt.hashSync("123456");

module.exports.userData = [
  {
    email: "admin@mail.com",
    phone: "1234567890",
    password: password,
    name: "IamAdmin",
    isAdmin: true,
  },
  {
    email: "a@mail.com",
    phone: "1234567891",
    password: password,
    name: "userA",
    isAdmin: false,
  },
  {
    email: "b@mail.com",
    phone: "1234567892",
    password: password,
    name: "userB",
    isAdmin: false,
  },
  {
    email: "c@mail.com",
    phone: "1234567893",
    password: password,
    name: "userC",
    isAdmin: false,
  },
];
