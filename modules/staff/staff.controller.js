const logger = require("./../utils/logger");
const httpCodes = require("http-status-codes");
const empty = require("is-empty");
const Handler = require("./command/staff.cmd.handler");
const StaffAddCommand = require("./command/staff.add.cmd");
const StaffUpdateCommand = require("./command/staff.update.cmd");
const StaffDeleteCommand = require("./command/staff.delete.cmd");
const fs = require("fs");
let handler;
class StaffController {
  constructor() {}

  /*
   * add staff
   */
  addStaff(req, res) {
    logger.info("ADD-STAFF", "Starting", req.body.username);
    try {
      let roleId = req.body.roleId;
      let username = req.body.username;
      let password = req.body.password;
      let email = req.body.email;
      let firstname = req.body.firstname;
      let lastname = req.body.lastname;
      let dob = req.body.dob;
      let address = req.body.address;
      let phone = req.body.phone;

      let command = new StaffAddCommand(
        roleId,
        username,
        password,
        email,
        firstname,
        lastname,
        dob,
        address,
        phone
      );
      handler = new Handler();
      handler
        .addStaff(command)
        .then(staff => {
          logger.info("ADD-STAFF", "Finished!");
          return res.status(httpCodes.OK).json(staff);
        })
        .catch(err => {
          logger.error(err.message);
          logger.info("ADD-STAFF", "Error!");
          return res
            .status(httpCodes.BAD_REQUEST)
            .json({ error: "Add staff error!!!" });
        });
    } catch (err) {
      logger.error(err);
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ error: "Error when processing!!" });
    }
  }

  /*
   * update staff
   */
  updateStaff(req, res) {
    logger.info("UPDATE-STAFF", "Starting", req.body.username);
    try {
      let id = req.body.id;
      let roleId = req.body.roleId;
      let username = req.body.username;
      let password = req.body.password;
      let email = req.body.email;
      let firstname = req.body.firstname;
      let lastname = req.body.lastname;
      let dob = req.body.dob;
      let address = req.body.address;
      let phone = req.body.phone;

      let command = new StaffUpdateCommand(
        id,
        roleId,
        username,
        password,
        email,
        firstname,
        lastname,
        dob,
        address,
        phone
      );
      handler = new Handler();
      handler
        .updateStaff(command)
        .then(staff => {
          logger.info("UPDATE-STAFF", "Finished!");
          return res.status(httpCodes.OK).json(staff);
        })
        .catch(err => {
          logger.error(err.message);
          logger.info("UPDATE-STAFF", "Error!");
          return res
            .status(httpCodes.BAD_REQUEST)
            .json({ error: "Update staff error!!!" });
        });
    } catch (err) {
      logger.error(err);
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ error: "Error when processing!!" });
    }
  }

  /*
   * delete staff
   */
  deleteStaff(req, res) {
    logger.info("DELETE-STAFF", "Starting", req.body.id);
    try {
      let id = req.body.id;
      let command = new StaffDeleteCommand(id);
      handler = new Handler();
      handler
        .deleteStaff(command)
        .then(staff => {
          logger.info("DELETE-STAFF", "Finished!");
          return res.status(httpCodes.OK).json(staff);
        })
        .catch(err => {
          logger.error(err.message);
          logger.info("DELETE-STAFF", "Error!");
          return res
            .status(httpCodes.BAD_REQUEST)
            .json({ error: "Delete staff error!!!" });
        });
    } catch (err) {
      logger.error(err);
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ error: "Error when processing!!" });
    }
  }
  /*
   * get all staff
   */
  getStaffAll(req, res) {
    logger.info("GET-STAFF-ALL");
    try {
      fs.readFile("config/infoTest/staff.json", "utf8", (err, fileContents) => {
        if (err) {
          console.error(err);
          return;
        }
        try {
          const data = JSON.parse(fileContents);
          res.send(data);
        } catch (err) {
          console.error(err);
        }
      });
    } catch (err) {
      logger.error(err);
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ error: "Error when processing!!" });
    }
  }
  /*
   * get all staff by id
   */
  getStaffById(req, res) {
    let id = req.params.id;
    try {
      fs.readFile("config/infoTest/staff.json", "utf8", (err, fileContents) => {
        if (err) {
          console.error(err);
          return;
        }
        try {
          const data = JSON.parse(fileContents);
          res.send(data[id - 1]);
        } catch (err) {
          console.error(err);
        }
      });
    } catch (err) {
      logger.error(err);
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ error: "Error when processing!!" });
    }
  }
}

module.exports = StaffController;
