const express = require("express");
const router = express.Router();

const verifyJWT = require("../../middleware/verifyJWT");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("..//../middleware/verityRoles");

router.route("/")
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), /* employeeController.createNewEmployee */);

module.exports = router;