const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = require("./../app");
const responseFormatter = require("./../utility/responseFormatter");

// exports.getLoginPage = function (request, h) {
//   return h.view("pages/login");
// };

exports.getUser = function (request, h) {
  return responseFormatter(
    "Successful",
    200,
    `${request.auth.credentials.user.name}'s data retrieved`,
    request.auth.credentials.user
  );
};

exports.registerUser = async function (request, h) {
  try {
    const { name, email, password: plainText } = request.payload;
    const password = await bcrypt.hash(plainText, 10);
    const newUser = await User.create({ name, email, password });
    const token = await jwt.sign(newUser.id, process.env.JWT_SECRET);
    h.state("token", token);
    return responseFormatter("Successful", 201, `User successfully saved`, {
      token,
      newUser,
    });
  } catch (err) {
    console.error(err);
    return responseFormatter("Error", 500, `Something went wrong`, "");
  }
};

exports.login = async function (request, h) {
  try {
    const { email, password: plainText } = request.payload;
    const user = await User.findOne({ email: email });
    if (!user)
      return responseFormatter(
        "Error",
        404,
        "There is no user with that email!.",
        "Please register First!."
      );
    if (!(await bcrypt.compare(plainText, user.password)))
      return responseFormatter(
        "Error",
        400,
        "Password or Email mismatch. Please try again",
        ""
      );
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    return responseFormatter("success", 200, "logged in successfully", {
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return responseFormatter(
      "Error",
      500,
      `Something went wrong Please try again`,
      ""
    );
  }
};

// exports.logout = function (request, h) {
//   return h.redirect("/").unstate("token");
// };
