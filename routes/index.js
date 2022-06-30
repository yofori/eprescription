const express = require("express");
const router = express.Router();
const {
  register,
  deleteUser,
  login,
  update,
  verifyUser,
  getAllUsers,
} = require("../controllers/user.controller");
const {
  createNew,
  getPrescription,
  addMedication,
  updateMedication,
  showPrescriberId,
  getPrescriberPrescriptions,
  getPatientPrescriptions,
} = require("../controllers/prescription.controller");
const { adminAuth, userAuth } = require("../middleware/auth");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/deleteuser").delete(adminAuth, deleteUser);
router.route("/verifyuser/:confirmationCode").get(verifyUser);
router.route("/getallusers").get(userAuth, getAllUsers);
router.route("/prescription/create").post(userAuth, createNew);
router.route("/prescription/:prescriptionId").get(getPrescription);
router.route("/medication/add/:prescriptionId").post(addMedication);
router.route("/medication/update/:prescriptionId").post(updateMedication);
router.route("/showprescriber").get(userAuth, showPrescriberId);
router
  .route("/prescriber/getprescriptions")
  .get(userAuth, getPrescriberPrescriptions);
router
  .route("/patient/getprescriptions")
  .get(userAuth, getPatientPrescriptions);
module.exports = router;
