const db = require("../models/index");

//creates a prescription
const createNew = async (req, res, next) => {
  req.body.prescriberID = req.session.user._id;
  req.body.prescriberMDCRegNo = req.session.user.prescriberMDCRegNo;
  req.body.prescriberName =
    req.session.user.title || "" +
    " " +
    req.session.user.firstname +
    " " +
    req.session.user.surname;
  const prescription = req.body;
  await db.Prescriptions.create(prescription)
    .then((Prescription) => {
      console.log("Prescription created");
      res
        .status(201)
        .json({ message: "Prescription created successfully", Prescription });
    })
    .catch((error) =>
      res.status(400).json({
        message: "Prescription not successfully created",
        error: error.message,
      })
    );
};

//get a prescription usind prescriptionid
const getPrescription = async (req, res, next) => {
  await db.Prescriptions.findById(req.params.prescriptionId).then(
    (prescription) => {
      console.log(prescription);
      if (!prescription) {
        return res.status(404).send({ message: "Prescription not found." });
      }
      res.status(200).json({
        message: "Success! Prescription found",
        username: prescription,
      });
    }
  );
};

// add medication to a prescription
const addMedication = async (req, res, next) => {
  const medication = req.body;
  try {
    await db.Prescriptions.updateOne(
      { _id: req.params.prescriptionId },
      { $push: { medications: medication } }
    );
    res.status(200).json({
      message: "Success! Medication Added to Prescription",
      Medication: medication,
    });
  } catch (error) {
    res.status(400).json({
      message: "Medication not successfully added to prescription",
      error: error.message,
    });
  }
};

// update existing medication on a prescription
const updateMedication = async (req, res) => {
  try {
    await db.Prescriptions.findById(req.params.prescriptionId).then(
      (prescription) => {
        prescription.medications.id(req.body._id).routeOfAdministration =
          req.body.routeOfAdministration;
        prescription.medications.id(req.body._id).dose = req.body.dose;
        prescription.medications.id(req.body._id).dosageRegimen =
          req.body.dosageRegimen;
        prescription.medications.id(req.body._id).noOfDays = req.body.noOfDays;
        prescription.markModified("medications");
        prescription.save((saveerr, saveresult) => {
          if (!saveerr) {
            res.status(200).send(saveresult);
          } else {
            res.status(400).send(saveerr.message);
          }
        });
        if (!prescription) {
          return res.status(404).send({
            message: "Prescription not found. Medication could not be updated",
          });
        }
      }
    );
  } catch (error) {
    res.status(400).json({
      message: "Existing Medication cannot be modified",
      error: error.message,
    });
  }
};

const showPrescriberId = (req, res) => {
  const user = req.session.user;
  console.log(user);
  if (!user) {
    res.status(400).json({ message: "Session Data Not Loaded" });
  } else {
    res.status(200).json({
      message: "Prescriber Details Successfully Retrieved",
      Prescriber: req.session.user,
    });
  }
};

const getPrescriberPrescriptions = async (req, res, next) => {
  try {
    await db.Prescriptions.find({
      prescriberID: req.session.user._id.toString(),
    }).then((prescriptions) => {
      if (prescriptions.length === 0) {
        res.status(400).json({ message: "No prescriptions found" });
      } else {
        res
          .status(200)
          .json({ message: "Success", Prescriptions: prescriptions });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "Prescriptions could not be retrieved",
      error: error.message,
    });
  }
};

const getPatientPrescriptions = async (req, res, next) => {
  try {
    await db.Prescriptions.find({
      pxId: req.query.pxId,
    }).then((prescriptions) => {
      if (prescriptions.length === 0) {
        res.status(400).json({ message: "No prescriptions found" });
      } else {
        res
          .status(200)
          .json({ message: "Success", Prescriptions: prescriptions });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "Prescriptions could not be retrieved",
      error: error.message,
    });
  }
};

module.exports = {
  createNew,
  getPrescription,
  addMedication,
  updateMedication,
  showPrescriberId,
  getPrescriberPrescriptions,
  getPatientPrescriptions,
};
