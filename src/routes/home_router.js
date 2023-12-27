const express = require('express');
const {checkifProjectExists} = require("../services/data_saver")

const router = express.Router();

module.exports = (data) => {
    router.get("/", async (req, res) => {
        const hasExistingProject = await checkifProjectExists(req,res);
        console.log(hasExistingProject);
        res.render("home.ejs", {hasExistingProject});
    });

    return router;
}
