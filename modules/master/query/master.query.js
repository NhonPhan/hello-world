const logger = require("./../../utils/logger");
const Promise = require("bluebird");
const MasterDao = require("./master.dao");
const RoleDto = require("../dto/role.dto");

let dao;
class MasterQueryService {
  constructor() {
    dao = new MasterDao();
  }

  /*
   * get roles
   */
  getRoles() {
    logger.info("get roles");
    return dao.getRoles().then(result => {
      if (!result) {
        // || result.length === 0
        return Promise.reject(new Error("No role found!"));
      }
      let dtos = [];
      let dto;
      result.forEach(item => {
        dto = new RoleDto(item.id, item.code, item.description);
        dtos.push(dto);
      });

      return Promise.resolve(dtos);
    });
  }
  /*
   * get role by id
   */
  getRoleById(roleId) {
    logger.info("get role by id", roleId);
    return dao.getRoleById(roleId).then(result => {
      if (!result) {
        // || result.length === 0
        return Promise.reject(new Error("No role found!"));
      }
      let item = result[0];
      let dto = new RoleDto(item.id, item.code, item.description);
      
      return Promise.resolve(dto);
    });
  }
}

module.exports = MasterQueryService;
