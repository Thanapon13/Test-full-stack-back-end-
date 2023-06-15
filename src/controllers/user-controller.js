const users = require("../DataUser/user");
console.log("users:", users);

exports.getUser = (req, res, next) => {
  try {
    // console.log("users:", users);
    res.status(201).json({ users });
  } catch (err) {
    next(err);
  }
};

exports.getUserId = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    // console.log("userId:", userId);
    const user = users.find(user => user.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log("user:", user);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.createUser = (req, res, next) => {
  try {
    const value = {
      id: users.length + 1,
      "First name": req.body["First name"],
      "Last name": req.body["Last name"],
      gender: req.body.gender,
      "Birth date": req.body["Birth date"],
      Image: req.body.Image || ""
    };

    users.push(value);
    // console.log("createUser:", users);
    res.status(200).json({ message: "Successfully created" });
  } catch (err) {
    next(err);
  }
};

exports.editUser = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    // console.log("userId:", userId);
    // console.log("---------------------------");
    // const value = req.body;
    // console.log("---------------------------");

    users.forEach(user => {
      if (user.id === userId) {
        user["First name"] = value["First name"];
        user["Last name"] = value["Last name"];
        user.gender = value.gender;
        user["Birth date"] = value["Birth date"];
        user.Image = value.Image;
      }
    });
    // console.log("---------------------------");
    // console.log("users:", users);

    res.status(200).json(value);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    // console.log("userId:", userId);

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);
    console.log("users:", users);
    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    next(err);
  }
};
