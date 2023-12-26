const { User } = require('.././models/models');

const signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    console.log('user',req.body.username)
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    if (req.body.password !== user.password) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }
    res.status(200).json({
      id: user.id,
      username: user.username,
      message: "User signed in successfully!",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { signup, signin };
