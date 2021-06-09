const ErrorResponse = require("../utlis/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //console.log(err);

  //mongoose bad object id error handler
  if (err.name === "CastError") {
    const message = `Resource not found with this id ${error.value} `;
    error = new ErrorResponse(message, 404);
  }
  //mongoose duplicate field error handler
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    const value = err.keyValue[key];
    const message = `${key} : ${value}  already exist ..please use another name`;
    error = new ErrorResponse(message, 404);
  }

  //mongoose validation error handler
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);

    error = new ErrorResponse(message[0], 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Something Went Wrong",
  });
};

module.exports = errorHandler;
