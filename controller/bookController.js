const Book = require("./../model/bookModel");
const responseFormatter = require("./../utility/responseFormatter");

exports.showDetailsPage = async (request, h) => {
  try {
    const book = await Book.findOne({ _id: request.params.id });
    return responseFormatter(
      "Successful",
      200,
      `${book.title}'s details has been fetched!!`,
      book
    );
  } catch (err) {
    console.log(err);
    return responseFormatter("Error", 500, `Something went wrong`, "");
  }
};
