const SchoolBus = require("../models/SchoolBus");
const RootBus = require("../models/RootBus");
const bcrypt = require("bcrypt");

const handleNewSchoolBus = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      address,
      idNumber,
      busNumber,
      chasisNumber,
      idFrontImage,
      idBackImage,
      busImage,
    } = req.body;

    console.log("Request body:", req.body);

    if (
      !username ||
      !password ||
      !email ||
      !idNumber ||
      !busNumber ||
      !chasisNumber ||
      !idFrontImage ||
      !idBackImage ||
      !busImage 
    ) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const duplicateSchoolBus = await SchoolBus.findOne({ email: email }).exec();
    if (duplicateSchoolBus) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPWD = await bcrypt.hash(password, 10);

    const newSchoolBus = await SchoolBus.create({
      username,
      email,
      password: hashedPWD,
      phone,
      address,
      idNumber,
      busNumber,
      chasisNumber,
      idFrontImage,
      idBackImage,
      busImage,
    });

    console.log("New School Bus:", newSchoolBus);

    res.status(200).json({ success: "Account created" });
  } catch (error) {
    console.error("Error creating new school bus:", error.message);
    res.status(500).json({ error: error.message });
  }
};
const handleNewRootBus = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      price,
      address,
      idNumber,
      busNumber,
      chasisNumber,
      idFrontImage,
      idBackImage,
      busImage,
      departures,
      arrivals,
    } = req.body;

    console.log("Request body:", req.body);

    if (
      !username ||
      !password ||
      !email ||
      !idNumber ||
      !busNumber ||
      !chasisNumber ||
      !idFrontImage ||
      !idBackImage ||
      !busImage ||
      !departures ||
      !arrivals ||
      !price 
    ) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const duplicateRootBus = await RootBus.findOne({ email: email }).exec();
    if (duplicateRootBus) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPWD = await bcrypt.hash(password, 10);

    // Convert departures and arrivals to JSON objects
    const parsedDepartures = JSON.parse(departures);
    const parsedArrivals = JSON.parse(arrivals);

    const newRootBus = await RootBus.create({
      username,
      email,
      password: hashedPWD,
      phone,
      price,
      address,
      idNumber,
      busNumber,
      chasisNumber,
      idFrontImage,
      idBackImage,
      busImage,
      departures: parsedDepartures,
      arrivals: parsedArrivals,
    });

    console.log("New Root Bus:", newRootBus);

    res.status(200).json({ success: "Account created" });
  } catch (error) {
    console.error("Error creating new root bus:", error.message);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { handleNewSchoolBus,handleNewRootBus};
