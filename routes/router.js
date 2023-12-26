const express = require('express');
const homeRouter = require('./home_router');
const apiRouter = require("./api_router");
const userRouter = require("./user_router");

const router = express.Router();

module.exports = (data)=>{
    // Handling the root route of the application.
    router.get("/",(req,res)=>{
        res.redirect("/signin");
    });

    router.get("/signin", (req, res) => {
        res.render("signin.ejs");
    });

    // Let's define sub routes
    router.use("/home",homeRouter());
    router.use("/data", apiRouter());
    router.use("/api/user", userRouter);
   
    return router;
}
