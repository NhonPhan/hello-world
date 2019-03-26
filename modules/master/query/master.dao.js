const logger = require("./../../utils/logger");
const DBManager = require("./../../utils/database_manager");
let dbManager;
let sequelize;

class MasterDao {
  constructor() {
    dbManager = new DBManager();
    if (dbManager.checkInitDB()) {
      sequelize = dbManager.getSequelize();
    }
  }

  /*
   * get roles
   */
  getRoles() {
    logger.info("DAO :: getRoles");
    let sql = "SELECT id, code, description ";
    sql += "FROM role";
    //logger.info('SQL', sql);

    return sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    });
  }
  /*
   * get roles
   */
  getRoleById(roleId) {
    logger.info("DAO :: getRoleById");
    let sql = "SELECT id, code, description ";
    sql += "FROM role ";
    sql += "WHERE id = :roleId";
    //logger.info('SQL', sql);

    return sequelize.query(sql, {
      replacements: { roleId: roleId },
      type: sequelize.QueryTypes.SELECT
    });
  }

  /*
   * transaction for this dao
   */
  transaction(txnFunction) {
    return sequelize.transaction(txnFunction);
  }
}

module.exports = MasterDao;
