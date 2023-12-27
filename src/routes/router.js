const express = require('express');
const homeRouter = require('./home_router');
const projectRouter = require("./project_router");
const userRouter = require("./user_router");
const { verifyToken } = require('../middlewares/authMiddleware')

const router = express.Router();

module.exports = (data)=>{
    // Handling the root route of the application.
    router.get("/",(req,res)=>{
        res.redirect("/signin");
    });

    router.get("/signin", (req, res) => {
        res.render("signin.ejs");
    });

   router.get("/signup", (req, res) => {
        res.render("signup");
    });

    router.get("/success", (req, res) => {
        res.render("success");
      });

    // define sub routes
    router.use("/home", [verifyToken], homeRouter());
    router.use("/api/project", [verifyToken], projectRouter);
    router.use("/api/user", userRouter);
   
    return router;
}
