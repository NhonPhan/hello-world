const logger = require("./../utils/logger");
const httpCodes = require("http-status-codes");
const MasterQueryService = require("./query/master.query");
let service;

class MasterController {
  constructor() {}

  /*
   * get roles
   */
  getRoles(req, res) {
    logger.info("GET-ROLES");
    try {
      service = new MasterQueryService();
      service
        .getRoles()
        .then(results => {
          let dataRes = {
            type: "roles",
            roles: {
              data: results
            }
          };
          return res.status(httpCodes.OK).json(dataRes);
        })
        .catch(err => {
          logger.error(err);
          return res
            .status(httpCodes.BAD_REQUEST)
            .json({ error: "Get roles error!!!" });
        });
    } catch (err) {
      logger.error(err);
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ error: "Error when processing!!" });
    }
  }
  /*
   * get roles
   */
  getRoleById(req, res) {
    logger.info("GET-ROLES");
    let roleId = req.params.roleId;
    try {
      service = new MasterQueryService();
      service
        .getRoleById(roleId)
        .then(result => {
          let dataRes = {
            type: "role",
            role: {
              data: result
            }
          };
          return res.status(httpCodes.OK).json(dataRes);
        })
        .catch(err => {
          logger.error(err.message);
          return res
            .status(httpCodes.BAD_REQUEST)
            .json({ error: "Get role by id error!!!" });
        });
    } catch (err) {
      logger.error(err);
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ error: "Error when processing!!" });
    }
  }
}

module.exports = MasterController;
