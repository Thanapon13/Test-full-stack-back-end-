const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const path = require("path");
const dataFilePath = path.resolve(__dirname, "../DataUser/user.json");
let datauser = [];

if (fs.existsSync(dataFilePath)) {
  datauser = require(dataFilePath);
}

exports.getUser = (req, res, next) => {
  try {
    // console.log("users:", users);
    res.status(201).json(datauser);
  } catch (err) {
    next(err);
  }
};

exports.getUserId = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const user = datauser.find(user => user.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    // console.log("req.files:", req.files);

    let value;

    const profilePublicId = req.body.image
      ? cloudinary.getPublicId(req.body.image)
      : null;

    if (!req.files || !req.files.Image) {
      return res.status(400).json({ message: "Profile Image is required" });
    }

    if (req.files) {
      const profileImage = await cloudinary.uploadProfile(
        req.files.Image[0].path,
        profilePublicId
      );
      value = { profileImage };
    }

    const newUser = {
      id: datauser.length + 1,
      "First name": req.body["First name"],
      "Last name": req.body["Last name"],
      gender: req.body.gender,
      "Birth date": req.body["Birth date"],
      Image: value
    };
    console.log("newUser:", newUser);

    datauser.push(newUser);
    fs.writeFileSync(dataFilePath, JSON.stringify(datauser));
    console.log("User added successfully");
    res.status(200).json({ message: "Successfully created" });
  } catch (err) {
    next(err);
  } finally {
    if (req.files.Image) {
      fs.unlinkSync(req.files.Image[0].path);
    }
  }
};

exports.editUser = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    console.log("userId:", userId);
    const value = req.body;
    console.log("value:", value);

    // console.log("datauser:", datauser);

    datauser.forEach(user => {
      if (user.id === userId) {
        user["First name"] = value["First name"];
        user["Last name"] = value["Last name"];
        user.gender = value.gender;
        user["Birth date"] = value["Birth date"];
      }
    });

    console.log("datauser:", datauser);

    res.status(200).json(value);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    // console.log("userId:", userId);

    const userIndex = datauser.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    datauser.splice(userIndex, 1);
    console.log("users:", datauser);
    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    next(err);
  }
};
