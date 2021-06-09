require("dotenv").config({ path: "./config/config.env" });
require("colors");
const fs = require("fs");
const mongoose = require("mongoose");
const Bootcamp = require("./models/Bootcamp.model");
const Course = require("./models/Course.model");
const User = require("./models/User.model");

mongoose
  .connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("database connect");
  });

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`)
);

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`));

const importData = async () => {
  try {
    await User.create(users);
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log("data imported successfully".green);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    console.log("data deleted successfully".red);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "i") {
  importData();
} else {
  deleteData();
}
