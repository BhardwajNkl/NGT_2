const express = require('express');
const homeRouter = express.Router();
homeRouter.get("/", (req, res) => {
    const hasExistingProject = false;
    res.render("home.ejs", {hasExistingProject});
});

module.exports = homeRouter;