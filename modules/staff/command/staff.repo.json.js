const Promise = require("bluebird");
const listStaff = require("../../../config/infoTest/staff.json");
const fs = require("fs");

class StaffRepository {
  addStaff(command) {
    listStaff.push(command);
    const json = JSON.stringify(listStaff);
    return new Promise((resolve, reject) => {
      fs.writeFile("config/infoTest/staff.json", json, "utf8", err => {
        if (err) {
          return reject("Write file json error!");
        }
        try {
          return resolve(command);
        } catch (err) {
          return reject("JSON Stringify error");
        }
      });
    });
  }

  updateStaff(command) {
    listStaff[command.id - 1] = command;
    const json = JSON.stringify(listStaff);
    return new Promise((resolve, reject) => {
      fs.writeFile("config/infoTest/staff.json", json, "utf8", err => {
        if (err) {
          return reject("Write file json error!");
        }
        try {
          return resolve(command);
        } catch (err) {
          return reject("JSON Stringify error");
        }
      });
    });
  }

  deleteStaff(command) {
  const item =  listStaff.splice(command.id - 1, 1);
    const json = JSON.stringify(listStaff);
    return new Promise((resolve, reject) => {
      fs.writeFile("config/infoTest/staff.json", json, "utf8", err => {
        if (err) {
          return reject("Write file json error!");
        }
        try {
          return resolve(item);
        } catch (err) {
          return reject("JSON Stringify error");
        }
      });
    });
  }
}

module.exports = StaffRepository;
