const Book = require("./../model/bookModel");
const yar = require("@hapi/yar");

exports.getCartPage = (request, h) => {
  let cart = request.session.cart;
  const displayCart = { items: [], total: 0 };
  let total = 0;
  for (let item in cart) {
    displayCart.items.push(cart[item]);
    total += cart[item].qty * cart[item].price;
  }
  displayCart.total = total;
  return h.view("cart/cart", { cart: displayCart });
};
exports.handleCartSubmittion = async (request, h) => {
  request.session.cart = request.session.cart || {};
  let cart = request.session.cart;
  const book = await Book.findOne({ _id: request.params.id });
  if (cart[book._id]) {
    cart[book._id].qty++;
  } else {
    cart[request.params.id] = {
      item: book._id,
      title: book.title,
      price: book.price,
      qty: 1,
    };
  }
  request.session.cart = cart;
  // console.log(request.session.cart);
  return h.redirect("/cart");
};
