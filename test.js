require("dotenv").config();
const QRCode = require("qrcode");

QRCode.toFile("./public/qrcodes/qrtest.png", "Go to see movie!", function (err) {
  if (err) throw err;
  console.log("done");
});
