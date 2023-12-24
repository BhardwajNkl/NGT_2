const express = require('express');

const router = express.Router();

module.exports = (data) => {
    router.get("/", (req, res) => {
        const hasExistingProject = false;
        res.render("home.ejs", {hasExistingProject});
    });

    return router;
}