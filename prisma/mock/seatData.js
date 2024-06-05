const { theaterData } = require("./theaterData");

const findSeatsData = () => {
  const rowName = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columnNum = 8;
  const seatDataList = [];
  for (let count = 1; count <= theaterData.length; count++) {
    for (let row = 1; row <= rowName.length; row++) {
      for (let col = 1; col <= columnNum; col++) {
        const seatData = {};
        seatData.theaterId = count;
        seatData.statusTypeId = 1;
        seatData.row = rowName[row - 1];
        if (rowName[row] === "A") {
          seatData.seatTypeId = 2;
          seatData.price = 500;
        } else {
          seatData.seatTypeId = 1;
          seatData.price = 200;
        }
        seatData.column = String(col);
        seatDataList.push(seatData);
      }
    }
  }
  return seatDataList;
};

const seatData = findSeatsData();

module.exports.seatData = seatData;
