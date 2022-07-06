const Mongoose = require("mongoose");

const InsurancePolicySchema = new Mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  insurnaceCompanyName: {
    type: String,
    required: true,
  },
  policyNo: {
    type: String,
    required: true,
    unique: true,
  },
  benefitPackageCode: {
    type: String,
    required: true,
  },
  benefitPackageName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  Status: {
    type: String,
    enum: ["Active", "Expired", "Disabled", "Suspended"],
    default: "Active",
  },
});

const PatientSchema = new Mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  title: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  age: {
    type: Number,
  },
  isAgeEstimated: {
    type: Boolean,
    required: true,
  },
  gender: {
    type: String,
    enum: ["female", "male", "unknown", "other"],
    default: "unknown",
  },
  telephone: {
    type: String,
  },
  email: {
    type: String,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  confirmationCode: {
    type: String,
  },
  nationalIdNo: {
    type: String,
  },
  nationalHealthInsurancedNo: {
    //membership number
    type: String,
  },
  insurancePolicies: [InsurancePolicySchema]
});

PatientSchema.set("timestamps", true);

const Patient = Mongoose.model("patient", PatientSchema);
module.exports = Patient;
