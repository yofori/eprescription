const Mongoose = require("mongoose");
const PatientSchema = new Mongoose.Schema({});

PatientSchema.set("timestamps", true);

const Patient = Mongoose.model("patient", PatientSchema);
module.exports = Patient;
