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
          username: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },

  {
    method: "POST",
    path: "/login",
    handler: userController.login,
    options: {
      tags: ["api"],
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
];
