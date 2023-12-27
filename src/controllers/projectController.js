const { saveNewProjectData, saveExistingProjectTimeSeriesData, getAllDataOfProject} = require("../services/data_saver");

const addProject = async (req,res) => {
    const postedData = req.body;
    if(postedData.projectType === "new") {
        let {attributes, attributeValues, attributeCount, timeseriesData, columnCount} = postedData;
        saveNewProjectData(req,res,attributes, attributeValues, attributeCount, timeseriesData, columnCount);
    } else{
        let {timeseriesData, columnCount} = postedData;
        saveExistingProjectTimeSeriesData(req,res,timeseriesData, columnCount);
    }
    res.status(201).send();
}

const findProject = async (req,res) => {
    const dataToReturn = await getAllDataOfProject(req,res);
    res.status(201).json(dataToReturn);
}

module.exports = { addProject, findProject }

