const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subRoutineSchema = new Schema({
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  price: { type: Number, required: true },
});

const RootBusSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  idNumber: { type: String, required: true },
  busNumber: { type: String, required: true },
  chasisNumber: { type: String, required: true },
  idFrontImage: { type: String, required: true },
  idBackImage: { type: String, required: true },
  busImage: { type: String, required: true },
  departures: [
    {
      from: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
  arrivals: [
    {
      to: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
  subRoutines: [subRoutineSchema],
});

module.exports = mongoose.model("RootBus", RootBusSchema);
