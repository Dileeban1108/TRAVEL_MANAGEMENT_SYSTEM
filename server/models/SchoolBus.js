const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolBusSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  idNumber: { type: String, required: true },
  busNumber: { type: String, required: true },
  chasisNumber: { type: String, required: true },
  idFrontImage: { type: String, required: true },
  idBackImage: { type: String, required: true },
  busImage: { type: String, required: true },
});

module.exports = mongoose.model("SchoolBus", SchoolBusSchema);
