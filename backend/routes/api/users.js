const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const { route } = require("../../../../haoshop/backend/routes/refresh");

router.route("/")
  .get(usersController.getAllUser)
  // .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUser)
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router;