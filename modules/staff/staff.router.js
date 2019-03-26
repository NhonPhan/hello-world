const express = require('express');
const StaffController = require('./staff.controller');
const Authorization = require('../authorization/authorization.controller');

// Create our Express router
const router = express.Router();

let controller = new StaffController();
let auth = new Authorization();

// Create endpoint handlers for staff
router.route('/staffs').post(auth.isAuthorized, controller.addStaff);
router.route('/staffs').put(auth.isAuthorized, controller.updateStaff);
router.route('/staffs').delete(auth.isAuthorized, controller.deleteStaff);
router.route('/staffs').get(auth.isAuthorized, controller.getStaffAll);
router.route('/staffs/:id').get(auth.isAuthorized, controller.getStaffById);
module.exports = router;
