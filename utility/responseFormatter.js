module.exports = (status, statusCode, message, data) => {
  return {
    stauts: status,
    statusCode: statusCode,
    message: message,
    data: data,
  };
};
