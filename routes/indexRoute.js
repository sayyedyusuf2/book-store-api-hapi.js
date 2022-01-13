const bookRoute = require("./bookRoute");
const manageRoute = require("./manageRoute");
const cartRoute = require("./cartRoute");
const userRoute = require("./userRoute");
const Book = require("./../model/bookModel");
const responseFormatter = require("./../utility/responseFormatter");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: async (request, h) => {
      try {
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
    },
  },
  {
    method: "GET",
    path: "/test",
    handler: async (request, h) => {
      const userInfo = await Book.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $unwind: {
            path: "$userInfo",
          },
        },
        {
          $project: {
            title: 1,
            name: "$userInfo.name",
          },
        },
      ]);
      return userInfo;
    },
    options: {
      tags: ["api"],
      auth: false,
    },
  },
].concat(bookRoute, manageRoute, cartRoute, userRoute);
