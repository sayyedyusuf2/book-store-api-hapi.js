const cartController = require("./../controller/cartController");

module.exports = [
  {
    method: "GET",
    path: "/cart",
    handler: cartController.getCartPage,
    options: { tags: ["api"], auth: false },
  },
  {
    method: "POST",
    path: "/cart/{id}",
    handler: cartController.handleCartSubmittion,
    options: {
      tags: ["api"],
      auth: false,
    },
  },
];
