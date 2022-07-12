require("dotenv").config();
const Mongoose = require("mongoose");
localDB = process.env.MONGODB_URI;
const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
};
module.exports = connectDB;
