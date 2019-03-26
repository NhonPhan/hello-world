const express = require('express');
const MasterController = require('./master.controller');
const Auth = require('./../authorization/authorization.controller');
// Create our Express router
const router = express.Router();

let controller = new MasterController();
let auth = new Auth();

// Create endpoint handlers for master info
router.route('/roles').get(auth.isAuthorized, controller.getRoles); 
router.route('/roles/:roleId').get(auth.isAuthorized, controller.getRoleById); 

module.exports = router;
