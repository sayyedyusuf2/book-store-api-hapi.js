"use strict";
const mongoose = require("mongoose");
const Book = require("./../model/bookModel");
const Category = require("./../model/categoryModel");
const responseFormatter = require("./../utility/responseFormatter");

exports.getLoggedInUserBooks = async (request, h) => {
  try {
    const books = await Book.aggregate([
      {
        $match: {
          userId: request.auth.credentials.user._id,
        },
      },
    ]);
    return responseFormatter(
      "Success",
      200,
      "This are All books availabale at book store for the " +
        request.auth.credentials.user.name,
      books
    );
  } catch (err) {
    console.error(err);
    return responseFormatter("Error", 500, "Something went wrong", "");
  }
};

exports.handleBooksAdd = async (request, h) => {
  const userId = request.auth.credentials.user._id;
  try {
    const newBook = await Book.create({ ...request.payload, userId });
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
          addedBy: "$userInfo.username",
        },
      },
      {
        $match: {
          title: newBook.title,
        },
      },
    ]);
    return responseFormatter(
      "Success",
      201,
      "Book has been created",
      userInfo[0]
    );
  } catch (err) {
    console.log("Save Error", err);
    return responseFormatter("Error", 500, "Something went wrong", "");
  }
};

exports.handleBooksEditPage = async (request, h) => {
  try {
    const loggedInUserBooks = await Book.aggregate([
      {
        $match: {
          userId: request.auth.credentials.user._id,
          _id: mongoose.Types.ObjectId(request.params.id),
        },
      },
    ]);
    if (!loggedInUserBooks.length > 0)
      return responseFormatter(
        "Error",
        400,
        "You dont have permission to edit this book"
      );
    const updatedBook = await Book.findOneAndUpdate(
      { _id: request.params.id },
      {
        $set: request.payload,
      },
      { new: true }
    );
    return responseFormatter("Success", 204, "Book edited successfully", {
      oldBook: loggedInUserBooks[0],
      updatedBook,
    });
  } catch (err) {
    console.log(err);
    return responseFormatter("Error", 500, "Something went wrong", "");
  }
};

exports.deleteBook = async (request, h) => {
  try {
    const loggedInUserBooks = await Book.aggregate([
      {
        $match: {
          userId: request.auth.credentials.user._id,
          _id: mongoose.Types.ObjectId(request.params.id),
        },
      },
    ]);
    if (!loggedInUserBooks.length > 0)
      return responseFormatter(
        "Error",
        400,
        "You dont have permission to delete this book"
      );
    await Book.deleteOne({ _id: request.params.id });
    return responseFormatter(
      "Success",
      202,
      "Book deleted successfully",
      loggedInUserBooks[0]
    );
  } catch (err) {
    console.log(err);
    return responseFormatter("Error", 500, "Something went wrong");
  }
};

exports.handleCategoryAddPage = async (request, h) => {
  try {
    const name = request.payload.name;
    const newCategory = await Category.create({ name: name });
    return responseFormatter(
      "Success",
      201,
      "New Category Added successful",
      newCategory
    );
  } catch (err) {
    console.log(err);
    return responseFormatter("Error", 500, "Something went wrong", "");
  }
};

exports.handleCategoryEditPage = async (request, h) => {
  try {
    const name = request.payload.name;
    const category = await Category.findOneAndUpdate(
      { _id: request.params.id },
      { name: name },
      { new: true }
    );
    return responseFormatter(
      "Success",
      204,
      "Category edited successfully",
      category
    );
  } catch (err) {
    console.log(err);
    return responseFormatter("Error", 500, "Something went wrong");
  }
};

exports.handleCategoryDelete = async (request, h) => {
  try {
    await Category.deleteOne({ _id: request.params.id });
    return responseFormatter("Success", 202, "Category deleted successfully");
  } catch (err) {
    console.log(err);
    return responseFormatter("Error", 500, "Something went wrong");
  }
};

exports.getAllCategories = async (request, h) => {
  try {
    const categories = await Category.find();
    return responseFormatter("Success", 200, "All categories", categories);
  } catch (err) {
    console.log(err);
    return responseFormatter("Error", 500, "Something went wrong");
  }
};
