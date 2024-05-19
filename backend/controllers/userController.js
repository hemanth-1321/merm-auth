import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        Error: "User Exists",
      });
    }

    const user = await User.create({
      name: name,
      email: email,
      password,
    });

    if (user) {
      generateToken(res, user._id);

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return res.status(400).json({
        Error: "Invalid User Data/user not created",
      });
    }
  } catch (error) {
    console.log("Error in the register section");
    res.status(500).json({
      Error: "Internal server error ",
    });
  }
};
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);

      return res.status(200).json({
        _id: user._id,
        name: user._name,
        email: user.email,
      });
    } else {
      res.status(401).json({
        Error: "Invalid user/password",
      });
    }
  } catch (error) {
    console.log("Error in the authUser-section", error.message);
    res.status(500).json({
      Error: "Internal server error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      MSG: "User logged Out successfully",
    });
  } catch (error) {
    console.log("Error in the logout Section", error.message);
    res.status(500).json({
      Error: "Internal server error",
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in the get user profile ", error.message);
    res.status(500).json({
      Error: "Internal server error ",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404).json({
        msg: "User not found",
      });
    }
  } catch (error) {
    console.log("Error in the updated user ", error.message);
    res.status(500).json({
      Error: "Internal server Error",
    });
  }
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
