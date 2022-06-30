const Mongoose = require("mongoose");
const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  prescriberMDCRegNo: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
  },
  surname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  telephoneNo: {
    type: String,
    required: true,
  },
});

UserSchema.set("timestamps", true);

const User = Mongoose.model("user", UserSchema);
module.exports = User;
