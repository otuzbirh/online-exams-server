const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { BadRequestError } = require('../errors')
require('dotenv').config();


const accessTokenMaxAge = 15 * 60;
const refreshTokenMaxAge = 7 * 24 * 60 * 60;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
console.log(process.env.ACCESS_TOKEN_SECRET);


const generateAccessToken = (id) => {
  return jwt.sign({ id }, accessTokenSecret, {
    expiresIn: accessTokenMaxAge,
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, refreshTokenSecret, {
    expiresIn: refreshTokenMaxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

User.login = async function(email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("incorrect password");
  }
  throw new Error("incorrect email");
};


module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    const token = generateAccessToken(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: refreshTokenMaxAge * 1000 });
    res.status(201).json({ 
      status: true, 
      
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    
      token 
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors, status: false, msg: 'Imas neku gresku' });
  }
};
