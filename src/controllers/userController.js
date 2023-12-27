const db = require('../models/index');
const config = require('../config/authConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { user: User } = db;

const signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    // console.log('user',req.body.username)
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
  
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
  
      const token = jwt.sign({ username: user.username }, config.secret, {
        algorithm: "HS256",
        expiresIn: 86400, // 24 hours
      });
  
    //   req.userId = user.userId;
      console.log(req.userId)

      res.cookie("accessToken", token, { httpOnly: true, maxAge: 86400 * 1000 });
      res.status(200).send({
        id: user.id,
        username: user.username,
        username: user.username,
        accessToken: token,
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { signup, signin };
