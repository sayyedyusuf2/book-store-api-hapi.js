const Joi = require("joi");
const userController = require("../controller/userController");

module.exports = [
  {
    method: "GET",
    path: "/user",
    handler: userController.getUser,
    options: {
      tags: ["api"],
      validate: {
        query: Joi.object({
          token: Joi.string().optional(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/register",
    handler: userController.registerUser,
    options: {
      tags: ["api"],
      auth: false,
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          email: Joi.string(),
          password: Joi.string(),
        }),
      },
    },
  },
  // {
  //   method: "GET",
  //   path: "/login",
  //   handler: userController.getLoginPage,
  //   options: {
  //     tags: ["api"],
  //     auth: false,
  //   },
  // },
  {
    method: "POST",
    path: "/login",
    handler: userController.login,
    options: {
      tags: ["api"],
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string(),
          password: Joi.string(),
        }),
      },
    },
  },
  // {
  //   method: "GET",
  //   path: "/logout",
  //   handler: userController.logout,
  //   options: {
  //     tags: ["api"],
  //     auth: false,
  //   },
  // },
];
