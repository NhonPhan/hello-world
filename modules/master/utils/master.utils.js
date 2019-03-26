const Promise = require("bluebird");
class MasterUtil {
  constructor() {}
  static processSomeLogic() {
    return new Promise((resolve, reject) => {
      // put logic here
      resolve(true);
    });
  }
}

module.exports = MasterUtil;
