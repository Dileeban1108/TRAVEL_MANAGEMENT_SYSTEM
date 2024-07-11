const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/getSchoolBuses", authController.getSchoolBuses);
router.get("/getRootBuses", authController.getRootBuses);
router.get("/getReviews", authController.getReviews);
router.post("/login", authController.handleLogin);
router.get("/getSchoolBus/:email", authController.getSchoolBus);
router.get("/getRootBus/:email", authController.getRootBus);
router.delete("/deleteSchoolBus/:id", authController.deleteSchoolBus);
router.post("/createReview", authController.createReview);
router.put("/updateSchoolBus", authController.updateSchoolBus);
router.put("/updateRouteBus", authController.updateRouteBus);

module.exports = router;
