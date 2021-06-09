const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log(`MongoDb connect: ${conn.connection.host}`.underline.cyan.bold);
};

module.exports = connectDB;
