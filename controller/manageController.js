"use strict";
const mongoose = require("mongoose");
const Book = require("./../model/bookModel");
const Category = require("./../model/categoryModel");
const responseFormatter = require("./../utility/responseFormatter");

// exports.getMangePage = (request, h) => {
//   return h.view("manage/index.pug");
// };

// exports.getMangeBooks = async (requset, h) => {
//   const books = await Book.find({});
//   return h.view("manage/books/index.pug", { books });
// };

// exports.getBooksAddPage = async (requset, h) => {
//   const categories = await Category.find({});
//   return h.view("manage/books/add", { categories });
// };

exports.handleBooksAdd = async (request, h) => {
  let {
    title,
    category,
    author,
    publisher,
    price,
    description,
    coverImage,
    userId,
  } = request.payload;
  userId = mongoose.Types.ObjectId(userId);
  try {
    const newBook = await Book.create({
      userId,
      title,
      category,
      author,
      publisher,
      price,
      description,
      coverImage,
    });
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
          addedBy: "$userInfo.name",
        },
      },
      {
        $match: {
          title: newBook.title,
        },
      },
    ]);
    return responseFormatter("Success", 201, "Book has been created", {
      data: userInfo[0],
    });
  } catch (err) {
    console.log("Save Error", err);
    return responseFormatter("Error", 500, "Something went wrong", "");
  }
};

// exports.getBooksEditPage = async (request, h) => {
//   const categories = await Category.find({});
//   const book = await Book.findOne({ _id: request.params.id });
//   return h.view("manage/books/edit", { book, categories });
// };

exports.handleBooksEditPage = async (request, h) => {
  try {
    const {
      title,
      category,
      author,
      publisher,
      price,
      description,
      coverImage,
    } = request.payload;
    const book = await Book.findOneAndUpdate(
      { _id: request.params.id },
      {
        title,
        category,
        author,
        publisher,
        price,
        description,
        coverImage,
      },
      { new: true }
    );
    return responseFormatter("Success", 204, "Book edited successfully", book);
  } catch (err) {
    console.log(err);
    return responseFormatter("Error", 500, "Something went wrong", "");
  }
};

exports.deleteBook = async (request, h) => {
  try {
    await Book.deleteOne({ _id: request.params.id });
    return responseFormatter("Success", 202, "Book deleted successfully", "");
  } catch (err) {
    console.log(err);
    return responseFormatter("Error", 500, "Something went wrong");
  }
};

// exports.getManageCategories = async (request, h) => {
//   const categories = await Category.find({});
//   return h.view("manage/categories/index", { categories });
// };

// exports.getCategoryAddPage = (request, h) => {
//   return h.view("manage/categories/add");
// };

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

// exports.getCategoryEditPage = async (request, h) => {
//   const category = await Category.findOne({ _id: request.params.id });
//   return h.view("manage/categories/edit", { category });
// };

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
