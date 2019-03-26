const logger = require("./../../utils/logger");
const Promise = require("bluebird");
const StaffModel = require("./staff.model");
let model;
class StaffCmdHandler {
  constructor() {
    model = new StaffModel();
  }

  addStaff(command) {
    return model.addStaff(command);
  }
  updateStaff(command) {
    return model.updateStaff(command);
  }
  deleteStaff(command) {
    return model.deleteStaff(command);
  }
}

module.exports = StaffCmdHandler;
