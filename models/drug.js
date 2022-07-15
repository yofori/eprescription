const Mongoose = require("mongoose");
const DrugSchema = new Mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    required: true,
  },
  proprietaryName: {
    type: String,
  },
  genericName: {
    type: String,
  },
  activeNumeratorStrength: {
    type: String,
  },
  activeIngredientUnit: {
    type: String,
  },
  routeOfAdmin: {
    type: String,
  },
});

DrugSchema.set("timestamps", true);

const Drug = Mongoose.model("drug", DrugSchema);
module.exports = Drug;
