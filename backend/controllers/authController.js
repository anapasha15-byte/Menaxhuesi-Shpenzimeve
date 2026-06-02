const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register
const register = async (req, res) => {
  try {

    const { username, password } = req.body;

    const userExists = await User.findOne({
      username,
    });

    if (userExists) {
      return res.status(400).json({
        message: "Ky përdorues ekziston",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Llogaria u krijua me sukses",
      username: user.username,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Login
const login = async (req, res) => {
  try {

    const { username, password } = req.body;

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(400).json({
        message: "Përdoruesi nuk ekziston",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Password gabim",
      });
    }

    res.status(200).json({
      message: "Login me sukses",
      username: user.username,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  register,
  login,
};