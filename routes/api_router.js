const express = require("express");
const { saveNewProjectData, saveExistingProjectTimeSeriesData, getAllDataOfProject} = require("../services/data_saver");

const router = express.Router();

module.exports = (data)=>{
    router.get("/", async (req, res) => {
        // {"attributes":attributes,
        // "attributeValues":attributeValues,
        // "attributeCount":attributeCount,
        // "timeseriesData":data}
        const dataToReturn = await getAllDataOfProject();
        // console.log("hahahaha")
        // console.log(dataToReturn.attributes[0].attributeValues);
        // console.log(dataToReturn.dataItems);

        res.json(dataToReturn);
    });

    router.post("/", (req, res) => {
        const postedData = req.body;
        // console.log(postedData);
        if(postedData.projectType === "new") {
            let {attributes, attributeValues, attributeCount, timeseriesData, columnCount} = postedData;
            // console.log(timeseriesData);
            saveNewProjectData(attributes, attributeValues, attributeCount, timeseriesData, columnCount);
        } else{
            let {timeseriesData, columnCount} = postedData;
            // console.log("existing project data")
            // console.log(timeseriesData)
            saveExistingProjectTimeSeriesData(timeseriesData, columnCount);
        }
        res.status(201).send();
    });
    return router;
}