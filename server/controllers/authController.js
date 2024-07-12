const SchoolBus = require("../models/SchoolBus");
const RootBus = require("../models/RootBus");
const Review = require("../models/Review");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addSubRoutine = async (req, res) => {
  const { busId } = req.params;
  const { departure, destination, price } = req.body;

  try {
    const bus = await RootBus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const newSubRoutine = {
      departure,
      destination,
      price
    };

    bus.subRoutines.push(newSubRoutine);
    await bus.save();

    res.status(200).json(bus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteSubRoutine = async (req, res) => {
  const { busId ,subRoutineIndex} = req.params;

  try {
    const bus = await RootBus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    if (subRoutineIndex < 0 || subRoutineIndex >= bus.subRoutines.length) {
      return res.status(400).json({ message: "Invalid sub-routine index" });
    }

    bus.subRoutines.splice(subRoutineIndex, 1);
    await bus.save();

    res.status(200).json(bus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getSchoolBuses = async (req, res) => {
  try {
    const result = await SchoolBus.find();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch school buses" });
  }
};
const createReview = async (req, res) => {
  const {name ,rating} = req.body;

  try {
    await Review.create({
      name: name,
      rating:rating,
    });

    res
      .status(200)
      .json({ success: `new review created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const getRootBuses = async (req, res) => {
  try {
    const result = await RootBus.find();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch root buses" });
  }
};
const getReviews = async (req, res) => {
  try {
    const result = await Review.find();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch root buses" });
  }
};
const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let foundUser = await SchoolBus.findOne({ email }).exec();
  if (foundUser) {
    console.log("user found in SchoolBus ");
  } else {
    foundUser = await RootBus.findOne({ email }).exec();
    if (foundUser) {
      console.log("user found in RootBus");
    }
  }

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const matchPassword = await bcrypt.compare(password, foundUser.password);

  if (matchPassword) {
    // Generate access token and refresh token
    const accessToken = jwt.sign(
      {
        userInfo: { username: foundUser.username },
        issuedAt: Date.now(),
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Save refresh token with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    // Set refresh token as an HTTP-only cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send access token to client
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "Unauthorized" }); // Password doesn't match
  }
};
const getSchoolBus = async (req, res) => {
  try {
    const { email } = req.params;
    const additionalFilters = req.body;

    const query = { email, ...additionalFilters };

    const result = await SchoolBus.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getRootBus = async (req, res) => {
  try {
    const { email } = req.params;
    const additionalFilters = req.body;

    const query = { email, ...additionalFilters };

    const result = await RootBus.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const updateSchoolBus = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      faculty,
      idNumber,
      busNumber,
      chasisNumber,
      idFrontImage,
      idBackImage,
      address,
      busImage,
    } = req.body;
    const imageUrl1 = idFrontImage;
    const imageUrl2 = idBackImage;
    const imageUrl3 = busImage;

    const query = { email };

    const updateSchoolBus = await SchoolBus.findOneAndUpdate(
      query,
      {
        username,
        email,
        phone,
        faculty,
        idNumber,
        busNumber,
        chasisNumber,
        imageUrl1,
        imageUrl2,
        address,
        imageUrl3,
      },
      { new: true }
    );

    if (!updateSchoolBus) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updateSchoolBus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
const updateRouteBus = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      faculty,
      idNumber,
      busNumber,
      chasisNumber,
      idFrontImage,
      idBackImage,
      address,
      busImage,
    } = req.body;
    const imageUrl1 = idFrontImage;
    const imageUrl2 = idBackImage;
    const imageUrl3 = busImage;

    const query = { email };

    const updateRouteBus = await RootBus.findOneAndUpdate(
      query,
      {
        username,
        email,
        phone,
        faculty,
        idNumber,
        busNumber,
        chasisNumber,
        imageUrl1,
        imageUrl2,
        address,
        imageUrl3,
      },
      { new: true }
    );

    if (!updateRouteBus) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updateRouteBus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
const deleteSchoolBus =async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBus = await SchoolBus.findByIdAndDelete(id);
    if (!deletedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    console.error("Error deleting bus:", error);
    res.status(500).json({ message: "Failed to delete bus" });
  }
}
module.exports = {
  getRootBus,
  getSchoolBuses,
  getRootBuses,
  getReviews,
  handleLogin,
  getSchoolBus,
  deleteSchoolBus,
  updateRouteBus,
  updateSchoolBus,
  createReview,
  deleteSubRoutine,
  addSubRoutine
};
