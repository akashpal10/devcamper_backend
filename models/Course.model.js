const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const doc = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        avg: { $avg: "$tuition" },
      },
    },
  ]);

  console.log(doc);
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(doc[0].avg / 10) * 10,
    });
  } catch (error) {
    console.log(error);
  }
};

CourseSchema.post("save", function () {
  console.log("entered", this.bootcamp);
  this.constructor.getAverageCost(this.bootcamp);
});

CourseSchema.pre("remove", function (next) {
  this.constructor.getAverageCost(this.bootcamp);
  next();
});
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
