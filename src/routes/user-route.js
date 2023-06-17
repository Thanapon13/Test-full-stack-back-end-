const express = require("express");
const userController = require("../controllers/user-controller");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/", userController.getUser);
router.get("/:id", userController.getUserId);
router.post(
  "/",
  upload.fields([{ name: "Image", maxCount: 1 }]),
  userController.createUser
);
router.put("/:id", userController.editUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
