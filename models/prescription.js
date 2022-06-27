const Mongoose = require("mongoose");

const MedicationSchema = new Mongoose.Schema({
  drugId: { type: "string" },
  drugName: { type: "string" },
  routeOfAdministration: { type: "string" },
  dose: { type: "string" },
  dosageRegimen: { type: "string" },
  noOfDays: { type: Number, default: 30 },
  status: {
    type: String,
    enum: ["submitted",  "completed"],
    default: "submitted",
  },
});

const Medication = Mongoose.model("Medication", MedicationSchema);

const PrescriptionSchema = new Mongoose.Schema({
  pxId: {
    type: String,
    required: true,
  },
  pxSurname: {
    type: String,
    required: true,
  },
  pxFirstname: {
    type: String,
  },
  pxgender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
  pxAge: {
    type: Number,
  },
  pxDOB: {
    type: Date,
  },
  prescriberID: {
    type: String,
    required: true,
  },
  prescriberMDCRegNo: {
    type: String,
    required: true,
  },
  prescriberName: {
    type: String,
    trim: true,
    required: true,
  },
  refillRx: {
    type: Boolean,
    default: false,
    required: true,
  },
  isPxRegistered: {
    type: Boolean,
    required: true,
  },
  maxRefillsAllowed: {
    type: Number,
  },
  noOfRefills: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["submitted", "partial", "completed"],
    default: "submitted",
  },
  medications: [MedicationSchema],
});

PrescriptionSchema.set("timestamps", true);

const Prescription = Mongoose.model("prescription", PrescriptionSchema);
(module.exports = Prescription), Medication;
