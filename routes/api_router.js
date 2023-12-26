const express = require("express");
const { saveNewProjectData, saveExistingProjectTimeSeriesData, getAllDataOfProject} = require("../services/data_saver");

const router = express.Router();

module.exports = (data)=>{
    router.get("/", async (req, res) => {
        const dataToReturn = await getAllDataOfProject();
        res.json(dataToReturn);
    });

    router.post("/", (req, res) => {
        const postedData = req.body;
        if(postedData.projectType === "new") {
            let {attributes, attributeValues, attributeCount, timeseriesData, columnCount} = postedData;
            saveNewProjectData(attributes, attributeValues, attributeCount, timeseriesData, columnCount);
        } else{
            let {timeseriesData, columnCount} = postedData;
            saveExistingProjectTimeSeriesData(timeseriesData, columnCount);
        }
        res.status(201).send();
    });
    return router;
}