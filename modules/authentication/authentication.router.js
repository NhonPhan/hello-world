const express = require('express');
const AuthenticationController = require('./authentication.controller');
const Authorization = require('../authorization/authorization.controller');
// Create our Express router
const router = express.Router();

let controller = new AuthenticationController();
let auth = new Authorization();
// Create endpoint handlers for authentication
router.route('/signin').post(controller.signin);
router.route('/signout').get(controller.signout);

module.exports = router;
