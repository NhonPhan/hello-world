const logger = require("./../../utils/logger");
const Promise = require("bluebird");
const StaffDao = require("./staff.dao");
const StaffDto = require("./../dto/staff.dto");

let dao;
class StaffQueryService {
  constructor() {
    logger.info("constructor of StaffQueryService");
    dao = new StaffDao();
  }

  checkStaff(username) {
    logger.info("check staff ::", username);
    return dao.getStaff(username).then(result => {
      if (!result || result.length === 0) {
        return Promise.reject(new Error("No Staff found!"));
        //throw new Error('No Staff found!');
      }
      let staff = result[0];
      //logger.info('query result::' + JSON.stringify(staff));

      let dto = new StaffDto(
        staff.id,
        staff.roleid,
        staff.username,
        staff.email,
        staff.password,
        staff.firstname,
        staff.lastname,
        staff.dob,
        staff.address,
        staff.phone
      );
      return Promise.resolve(dto);
    });
  }

  getStaffAll() {
    return dao.getStaffAll().then(result => {
      if (!result || result.length === 0) {
        return Promise.reject(new Error("No Staff found!"));
        //throw new Error('No Staff found!');
      }
      let dtos = [];
      let dto;
      result.forEach(item => {
        dto = new StaffDto(
          item.id,
          item.roleid,
          item.username,
          item.email,
          item.password,
          item.firstname,
          item.lastname,
          item.dob,
          item.address,
          item.phone
        );
        dtos.push(dto);
      });
      return Promise.resolve(dtos);
    });
  }

  getStaffById(id) {
    return dao.getStaffById(id).then(result => {
      if (!result) {
        return Promise.reject(new Error("No role found!"));
      }
      let item = result[0];
      let dto = new StaffDto(
        item.id,
        item.roleid,
        item.username,
        item.email,
        item.password,
        item.firstname,
        item.lastname,
        item.dob,
        item.address,
        item.phone
      );
      return Promise.resolve(dto);
    });
  }
}

module.exports = StaffQueryService;
