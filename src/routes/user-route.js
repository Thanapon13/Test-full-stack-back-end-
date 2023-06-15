const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/", userController.getUser);
router.get("/:id", userController.getUserId);
router.post("/", userController.createUser);
router.put("/:id", userController.editUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
