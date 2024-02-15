const express = require("express");
const { User } = require("../models/user");

const userRoute = express.Router();

userRoute.get("/user", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.json(userData);
  } catch (error) {
    console.error("Error in user post route:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

userRoute.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userData = await User.findAll({ where: { userId: userId } });
    res.json(userData);
  } catch (error) {
    console.error("Error in user post route:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

userRoute.post("/user", async (req, res) => {
  try {
    const { name, email, phone, company, website, city, userId } = req.body;
    if (!name || !email || !phone || !company || !website || !city || !userId) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const userDetail = await User.create({
      name,
      email,
      phone,
      company,
      website,
      city,
      userId,
    });

    res.status(201).json({
      message: "User saved successfully",
      savedData: userDetail,
    });
  } catch (error) {
    console.error("Error in user post route:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = {
  userRoute,
};
