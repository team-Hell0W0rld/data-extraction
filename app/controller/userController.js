const User = require("../models/userModel");

exports.getUser = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
};

exports.addDocument = async(req, res, next) => {
  console.log(req.files);
  res.status(200).json({message:"Document successfully added"});
}
