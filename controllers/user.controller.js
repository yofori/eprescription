require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("../config/nodemailer.config");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

//This handles the registration of a user
const register = async (req, res, next) => {
  const newuser = req.body;
  if (newuser.password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  const verificationtoken = crypto.randomBytes(16).toString("hex");
  newuser.confirmationCode = verificationtoken;
  bcrypt.hash(newuser.password, 10).then(async (hash) => {
    newuser.password = hash;
    await User.create(newuser)
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, username: user.username, role: user.role },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(201).json({
          message: "User was registered successfully! Please check your email",
          user: user._id,
          username: user.username,
        });
        nodemailer.sendConfirmationEmail(
          user.username,
          user.email,
          user.confirmationCode
        );
      })
      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      );
  });
};

//This handles the login process
const login = async (req, res, next) => {
  const { username, password } = req.body;
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
  // checks if the provided username exists
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          if (user.status != "Active") {
            return res.status(401).send({
              message: "Pending Account. Please Verify Your Email!",
            });
          } else {
            req.session.user = user;
            req.session.user.id = user._id;
            req.session.save;
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
              { id: user._id, username, role: user.role },
              jwtSecret,
              {
                expiresIn: maxAge, // 3hrs in sec
              }
            );
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            res.status(200).json({
              message: "User successfully Logged in",
              user: user._id,
            });
          }
        } else {
          res.status(400).json({ message: "Login not succesful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const update = async (req, res, next) => {
  const { role, id } = req.body;
  // Verifying if role and id is presnt
  if (role && id) {
    // Verifying if the value of role is admin
    if (role === "admin") {
      await User.findById(id)
        .then((user) => {
          // Verifies the user is not an admin
          if (user.role !== "admin") {
            user.role = role;
            user.save((err) => {
              //Monogodb error checker
              if (err) {
                res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res.status("201").json({ message: "Update successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    } else {
      res.status(400).json({
        message: "Role is not admin",
      });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((user) => user.remove())
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};

const verifyUser = (req, res, next) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.status = "Active";
      //user.confirmationCode = "";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).json({
          message: "Success! Account for user activated",
          username: user.username,
        });
      });
    })
    .catch((e) => console.log("error", e));
};

const getAllUsers = async (req, res) => {
  await User.find().then((user) => {
    res.status(200).send({ message: "Success", user });
  });
};

module.exports = {
  register,
  login,
  update,
  deleteUser,
  verifyUser,
  getAllUsers,
};
