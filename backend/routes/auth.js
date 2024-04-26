const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MYSECRETKEY = "IAMMUBEENIAMA$OODBOY";
// for signupp
router.post("/signup", async (request, response) => {
  try {
    // console.log(request.body)
    const { firstname, email, password } = request.body;
    if (!firstname || !email || !password) {
      return response.status(401).json({ error: "PLease fill complete form" });
    }
    // ensuring that user get registered only one time
    let registeredUser = await User.findOne({ email: email });
    if (registeredUser) {
      return response
        .status(401)
        .json({ error: "User already exist.Try login" });
    }

    // for hashing password
    const salt = await bcrypt.genSalt(10);
    const secretPass = await bcrypt.hash(password, salt);
    let newUser = await User.create({
      name: firstname,
      email: email,
      password: secretPass,
    });
    if (!newUser) {
      return response.status(402).json({ error: "New user is not Created" });
    }

    // adding userid and secretkey to create jwtoken so that we can extract userid from its token on frontend and backend both
    const data = {
      user: {
        id: newUser._id,
      },
    };

    const token = jwt.sign(data, MYSECRETKEY);

    response.send({ message: "user registered successfully", newUser, token });
  } catch (error) {
    response.status(401).json({ message: "error in signup backend" });
  }
});

// for signin
router.post("/signin", async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(401).json({ error: "PLease fill complete form" });
  }
  let registeredUser = await User.findOne({ email: email });
  if (!registeredUser) {
    return response
      .status(400)
      .json({ error: "User not found. Please get signup" });
  }
  // Compare the password provided by the user with the hashed password stored in the database
  const isPasswordMatch = await bcrypt.compare(
    password,
    registeredUser.password
  );
  if (!isPasswordMatch) {
    return response
      .status(401)
      .json({ error: "Invalid credentials. Please try again" });
  }

  const data = {
    user: {
      id: registeredUser._id,
    }
  };

  const token = jwt.sign(data, MYSECRETKEY);

  response.send({ message: "user login successfully", registeredUser, token });
});

module.exports = router;
