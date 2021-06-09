require("dotenv").config({ path: "./config/config.env" });
require("colors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fileupload = require("express-fileupload");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const app = express();

//database connection
connectDB();

app.use(express.json());

app.use(morgan("dev"));

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//bring router
const bootcampRouter = require("./routes/bootcamp.router");
const courseRouter = require("./routes/course.router");
const authRouter = require("./routes/auth.router");
const reviewRouter = require("./routes/review.router");

app.use(`${process.env.API_URL}/bootcamps`, bootcampRouter);
app.use(`${process.env.API_URL}/courses`, courseRouter);
app.use(`${process.env.API_URL}/auth`, authRouter);
app.use(`${process.env.API_URL}/reviews`, reviewRouter);

app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(`server run on port ${PORT}`.yellow)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`.red);
  server.close(() => process.exit(1));
});
