const express = require('express');
const projectRouter = express.Router();
const controller = require('../controllers/projectController');

projectRouter.post("/addProject", controller.addProject);
projectRouter.get("/findProject", controller.findProject);

module.exports = projectRouter;