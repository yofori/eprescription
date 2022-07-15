const express = require("express");
const router = express.Router();
const drug = require("../controllers/drug.controller");
const { adminAuth, userAuth } = require("../middleware/auth");
router.route("/getalldrugs").get(drug.getall);

module.exports = router;