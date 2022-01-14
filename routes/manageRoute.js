const Joi = require("joi");
const manageControllers = require("./../controller/manageController");

module.exports = [
  {
    method: "GET",
    path: "/manage/books",
    handler: manageControllers.getLoggedInUserBooks,
    options: {
      tags: ["api"],
      description: "get logged in user books",
      validate: {
        query: Joi.object({
          token: Joi.string().optional(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/manage/books",
    handler: manageControllers.handleBooksAdd,
    options: {
      tags: ["api"],
      description: "To add the book",
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          author: Joi.string().required(),
          publisher: Joi.string().required(),
          price: Joi.number().required(),
          category: Joi.string().required(),
          description: Joi.string().required(),
          coverImage: Joi.string().required(),
        }),
        query: Joi.object({
          token: Joi.string().optional(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/manage/books/edit/{id}",
    handler: manageControllers.handleBooksEditPage,
    options: {
      tags: ["api"],
      description: "To edit the book",
      validate: {
        params: Joi.object({ id: Joi.string().required() }),
        payload: Joi.object({
          title: Joi.string().optional(),
          author: Joi.string().optional(),
          publisher: Joi.string().optional(),
          price: Joi.number().optional(),
          category: Joi.string().optional(),
          description: Joi.string().optional(),
          coverImage: Joi.string().optional(),
        }),
        query: Joi.object({
          token: Joi.string().optional(),
        }),
      },
    },
  },
  {
    method: "DELETE",
    path: "/manage/books/delete/{id}",
    handler: manageControllers.deleteBook,
    options: {
      tags: ["api"],
      description: "To delete the book",
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
        query: Joi.object({
          token: Joi.string().optional(),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/manage/categories",
    handler: manageControllers.getAllCategories,
    options: {
      tags: ["api"],
      auth: false,
      description: "To get all categories",
    },
  },
  {
    method: "POST",
    path: "/manage/categories",
    handler: manageControllers.handleCategoryAddPage,
    options: {
      tags: ["api"],
      description: "To add category",
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
        }),
        query: Joi.object({
          token: Joi.string().optional(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/manage/categories/edit/{id}",
    handler: manageControllers.handleCategoryEditPage,
    options: {
      tags: ["api"],
      description: "To Edit category",
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
        }),
        params: Joi.object({
          id: Joi.string().required(),
        }),
        query: Joi.object({
          token: Joi.string().optional(),
        }),
      },
    },
  },
  {
    method: "DELETE",
    path: "/manage/categories/delete/{id}",
    handler: manageControllers.handleCategoryDelete,
    options: {
      tags: ["api"],
      description: "To delete category",
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
        query: Joi.object({
          token: Joi.string().optional(),
        }),
      },
    },
  },
];
