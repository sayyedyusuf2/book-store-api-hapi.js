const Joi = require("joi");
const manageControllers = require("./../controller/manageController");

module.exports = [
  // {
  //   method: "GET",
  //   path: "/manage",
  //   handler: manageControllers.getMangePage,
  //   options: {
  //     tags: ["api"],
  //   },
  // },
  // {
  //   method: "GET",
  //   path: "/manage/books",
  //   handler: manageControllers.getMangeBooks,
  //   options: {
  //     tags: ["api"],
  //   },
  // },
  // {
  //   method: "GET",
  //   path: "/manage/books/add",
  //   handler: manageControllers.getBooksAddPage,
  //   options: {
  //     tags: ["api"],
  //   },
  // },
  {
    method: "POST",
    path: "/manage/books",
    handler: manageControllers.handleBooksAdd,
    options: {
      tags: ["api"],
      description: "To add the book",
      validate: {
        payload: Joi.object({
          userId: Joi.string(),
          title: Joi.string(),
          author: Joi.string(),
          publisher: Joi.string(),
          price: Joi.number(),
          category: Joi.string(),
          description: Joi.string(),
          coverImage: Joi.string(),
        }),
        query: Joi.object({
          token: Joi.string().optional(),
        }),
      },
    },
  },
  // {
  //   method: "GET",
  //   path: "/manage/books/edit/{id}",
  //   handler: manageControllers.getBooksEditPage,
  //   options: {
  //     tags: ["api"],
  //   },
  // },
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
          title: Joi.string(),
          author: Joi.string(),
          publisher: Joi.string(),
          price: Joi.number(),
          category: Joi.string(),
          description: Joi.string(),
          coverImage: Joi.string(),
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
  // {
  //   method: "GET",
  //   path: "/manage/categories",
  //   handler: manageControllers.getManageCategories,
  //   options: {
  //     tags: ["api"],
  //   },
  // },
  // {
  //   method: "GET",
  //   path: "/manage/categories/add",
  //   handler: manageControllers.getCategoryAddPage,
  //   options: {
  //     tags: ["api"],
  //   },
  // },
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
  // {
  //   method: "GET",
  //   path: "/manage/categories/edit/{id}",
  //   handler: manageControllers.getCategoryEditPage,
  //   options: {
  //     tags: ["api"],
  //   },
  // },
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
