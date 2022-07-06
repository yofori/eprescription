const express = require("express");
const router = express.Router();
const patient = require("../controllers/patient.controller");
router.route("/register").post(patient.register);

module.exports = router;
