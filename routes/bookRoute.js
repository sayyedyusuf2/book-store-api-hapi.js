const bookController = require("./../controller/bookController");
const joi = require("joi");

module.exports = [
  {
    method: "GET",
    path: "/books/details/{id}",
    handler: bookController.showDetailsPage,
    options: {
      tags: ["api"],
      auth: false,
      description: "To get Individual book data",
      validate: {
        params: joi.object({
          id: joi.string().required(),
        }),
        // failAction: (err, request, h) => {
        //   throw err;
        // },
      },
    },
  },
];
