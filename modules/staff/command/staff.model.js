const Promise = require("bluebird");
const logger = require("./../../utils/logger");
const Hashing = require("./../../utils/hashing");
const StaffRepository = require("./staff.repo.json");
const StaffAddCommand = require("./staff.add.cmd");
const StaffUpdateCommand = require("./staff.update.cmd");
const StaffDeleteCommand = require("./staff.delete.cmd");
const MasterService = require("./../../master/query/master.query");

let repo;
let masterService;
class StaffModel {
  constructor() {
    repo = new StaffRepository();
  }

  /*
   * add staff
   */
  addStaff(command) {
    if (command instanceof StaffAddCommand) {
      masterService = new MasterService();
      return masterService.getRoleById(command.role_id).then(role => {
        logger.info("Role", role);
        return StaffModel.hashPassword(command.password).then(pwHash => {
          command.password = pwHash;
          return repo.addStaff(command).then(result => {
            return Promise.resolve(result);
          });
        });
      });
    } else {
      return Promise.reject(new Error("Command is invalid!"));
    }
  }

  /*
   * update staff
   */

  updateStaff(command) {
    if (command instanceof StaffUpdateCommand) {
      masterService = new MasterService();
      return masterService.getRoleById(command.role_id).then(role => {
        logger.info("Role", role);
        return StaffModel.hashPassword(command.password).then(pwHash => {
          command.password = pwHash;
          return repo.updateStaff(command).then(result => {
            return Promise.resolve(result);
          });
        });
      });
    } else {
      return Promise.reject(new Error("Command is invalid!"));
    }
  }

  /*
   * delete staff
   */

  deleteStaff(command) {
    if (command instanceof StaffDeleteCommand) {
      return repo.deleteStaff(command).then(result => {
        return Promise.resolve(result);
      });
    } else {
      return Promise.reject(new Error("Command is invalid!"));
    }
  }
  /*
   * hash pasword
   */

  static hashPassword(password) {
    if (password) {
      let hasing = new Hashing();
      return Promise.resolve(hasing.makeHashPass(password));
    } else {
      return Promise.reject("No password!!");
    }
  }
}

module.exports = StaffModel;
