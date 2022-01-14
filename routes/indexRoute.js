const bookRoute = require("./bookRoute");
const manageRoute = require("./manageRoute");
// const cartRoute = require("./cartRoute");
const userRoute = require("./userRoute");
const Book = require("./../model/bookModel");
const responseFormatter = require("./../utility/responseFormatter");
const Joi = require("joi");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: async (request, h) => {
      try {
        if (request.query.sort) {
          const sortArr = request.query.sort.split(",");
          const sortObj = {};
          sortObj[sortArr[0]] = parseInt(sortArr[1]);
          const books = await Book.aggregate([
            {
              $sort: sortObj,
            },
          ]);
          return responseFormatter(
            "Success",
            200,
            "This are All books availabale at book store",
            books
          );
        }
        if (request.query.limit) {
          const books = await Book.aggregate([
            {
              $limit: parseInt(request.query.limit),
            },
          ]);
          return responseFormatter(
            "Success",
            200,
            "This are All books availabale at book store",
            books
          );
        }
        if (request.query.category) {
          const books = await Book.aggregate([
            {
              $match: {
                category: request.query.category,
              },
            },
          ]);
          return responseFormatter(
            "Success",
            200,
            "This are All books availabale at book store",
            books
          );
        }
        const books = await Book.find({});
        return responseFormatter(
          "Success",
          200,
          "This are All books availabale at book store",
          books
        );
      } catch (err) {
        console.error(err);
        return responseFormatter("Error", 500, "Something went wrong", "");
      }
    },
    options: {
      tags: ["api"],
      auth: false,
      description: "To get all books",
      validate: {
        query: Joi.object({
          sort: Joi.string().optional(),
          limit: Joi.string().optional(),
          category: Joi.string().optional(),
        }),
      },
    },
  },
  // {
  //   method: "GET",
  //   path: "/test",
  //   handler: async (request, h) => {
  //     const userInfo = await Book.aggregate([
  //       {
  //         $lookup: {
  //           from: "users",
  //           localField: "userId",
  //           foreignField: "_id",
  //           as: "userInfo",
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: "$userInfo",
  //         },
  //       },
  //       {
  //         $project: {
  //           title: 1,
  //           name: "$userInfo.name",
  //         },
  //       },
  //     ]);
  //     return userInfo;
  //   },
  //   options: {
  //     tags: ["api"],
  //     auth: false,
  //   },
  // },
].concat(bookRoute, manageRoute, userRoute);
