const User = require("../models/userModel");

exports.getUser = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
};
