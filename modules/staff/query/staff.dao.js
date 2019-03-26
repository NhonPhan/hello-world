const logger = require("./../../utils/logger");
const DBManager = require("./../../utils/database_manager");
const Sequelize = require("sequelize");
const AccessedConfig = require("./../../../config/accessed/info");
const fs = require("fs");

let dbManager;
let sequelize;
let Staff;

class StaffDao {
  constructor() {
    dbManager = new DBManager();
    if (dbManager.checkInitDB()) {
      sequelize = dbManager.getSequelize();
      Staff = sequelize.import("./../../../models/staff");
    }
  }

  getStaff(userName) {
    logger.info("DAO :: getStaff");
    let username = userName.toLowerCase();
    let sql = "SELECT id, role_id as roleId, ";
    sql +=
      "username, password, email, firstname, lastname, dob, address, phone ";
    sql += "FROM staff ";
    sql += "WHERE (email = :username OR username = :username) ";
    sql += "LIMIT 1;";

    return sequelize.query(sql, {
      replacements: { username: username },
      type: sequelize.QueryTypes.SELECT
    });
  }

  getStaffAll() {
    logger.info("DAO :: getStaffAll");
    let sql = "SELECT id, role_id as roleId, ";
    sql +=
      "username, password, email, firstname, lastname, dob, address, phone ";
    sql += "FROM staff ";

    return sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    });
  }
  getStaffById(id) {
    logger.info("DAO :: getStaffById");
    let sql = "SELECT id, role_id as roleId, ";
    sql +=
      "username, password, email, firstname, lastname, dob, address, phone ";
    sql += "FROM staff ";
    sql += "WHERE id = :id";

    return sequelize.query(sql, {
      replacements: { id: id },
      type: sequelize.QueryTypes.SELECT
    });
  }

  transaction(txnFunction) {
    return sequelize.transaction(txnFunction);
  }
}

module.exports = StaffDao;
