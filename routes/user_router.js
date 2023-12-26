const express = require('express');
const userRouter = express.Router();
const controller = require('../controllers/userController');

userRouter.post("/signup", controller.signup);
userRouter.post("/signin", controller.signin);

module.exports = userRouter;
