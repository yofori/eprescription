const express = require("express");
const router = express.Router();
const prescription = require("../controllers/prescription.controller");
const { adminAuth, userAuth } = require("../middleware/auth");
router.route("/create").post(userAuth, prescription.createNew);
router.route("/addmedication/:prescriptionId").post(prescription.addMedication);
router
  .route("/updatemedication/:prescriptionId")
  .post(prescription.updateMedication);
router
  .route("/getprescriberprescriptions")
  .get(userAuth, prescription.getPrescriberPrescriptions);
router
  .route("/getpatientprescriptions")
  .get(userAuth, prescription.getPatientPrescriptions);
router.route("/showprescriber").get(userAuth, prescription.showPrescriberId);
router.route("/:prescriptionId").get(prescription.getPrescription);

module.exports = router;
