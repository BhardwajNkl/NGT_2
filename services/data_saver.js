const {User, Project, Attribute, attributeValues, DataItem, AttributeValue} = require("../models/models");
// function to save data for new project
// 1. save attributes and other details
// 2. save time series data
const saveNewProjectData = async (attributes, attributeValues, attributeCount, timeseriesData, columnCount)=> {
    // console.log("new project");
    // console.log(attributes)
    // console.log(timeseriesData);

    //  CURRENTLY, THERE IS ONLY ONE USER. SO WE COULD DIRECTY SAVE FOR HIM. BUT WHEN WE EXTEND THE APPLICATION FOR MULTIPLE USERS,
    // WE WOULD FIRST GET THE USER, GET THE PROJECT AND ONLY THEN WE CAN SAVE DATA IN THE DATABASE.

    // 1. load user
    const user = await User.findOne({ where: { username:"root" } });

    // 2. create and save project for this user
    const project = {
        projectName:"main_project",
        columnCount
    }
    const createdProject = await Project.create(project);
    await user.addProjects([createdProject]);

    // 3. save attributes and values of attributes
    let createdAttributes = [];
    for (let i = 0; i < attributeCount; i++) {
        const attribute = attributes[i];
        const attributeValue = attributeValues[i];
        
        console.log(attribute);
        // create attribute entity
        const attributeEntity = {attributeName:attribute};
        const createdAttribute = await Attribute.create(attributeEntity);
        createdAttributes.push(createdAttribute);
        await createdProject.addAttributes([createdAttribute]);

        // for this attribute we need to save all the values
        attributeValue.forEach(async attributeVal => {
            const attributeValEntity = {attributeValueName: attributeVal};
            const createdAttributeValEntity = await AttributeValue.create(attributeValEntity);
            // this created attribute value entity belongs to createdAttributeEntity
            await createdAttribute.addAttributeValues([createdAttributeValEntity])
        });
    }

    // 4. save timeseries data items for this project
    timeseriesData.forEach(async dataItem => {
        const dataItemEntity = {
            col: dataItem.dataTimeSeriesColumn,
            row: dataItem.dataTimeSeriesRow,
            value: dataItem.value
        };
        const createdDataItem = await DataItem.create(dataItemEntity);
        // this data item belongs to the newly created project
        createdProject.addDataItems([createdDataItem]);
    })

}

// function for saving timeseries data for existng project
// save last latest column data
const saveExistingProjectTimeSeriesData = async (timeseriesData, columnCount)=> {
    console.log("old project")
    console.log(timeseriesData);
    // update project's columnCount
    const user = await User.findOne({ where: { username:"root" }});
    const projects = await user.getProjects({
        limit: 1
      });
    const project = projects[0];
    const projectId = project.projectId;
    await Project.update({
        columnCount
    }, {
        where: { projectId }
    });

    // now update or save timeseries data items
    timeseriesData.forEach(async item=>{
        console.log("hahahaha")
        console.log(item);
        await DataItem.findOrCreate({
            where: {
              row: item.dataTimeSeriesRow,
              col: item.dataTimeSeriesColumn,
              projectProjectId:projectId
            },
            defaults: {
                row: item.dataTimeSeriesRow,
                col: item.dataTimeSeriesColumn,
                value: item.value,
                projectProjectId:projectId,
              }, // If not found, create a new record with the request body
          }).then(async ([dataItem, created]) => {
            // 'dataItem' will be the instance of the record (whether newly created or existing)
            // 'created' will be a boolean indicating whether the record was created or found
        
            if (!created) {
              // If the record already existed, update its values
              await dataItem.update({
                value: item.value,
              })
            }
            })
        })
}

const checkifProjectExists = async ()=>{
    // get user name and load user
    const user = await User.findOne({ where: { username:"root" }, include:Project});
    const projects = await user.projects;
    if(projects.length>0){
        return true;
    }
    return false;
}

const getAllDataOfProject = async ()=>{
    // WHEN WE WILL EXTEND THE APP TO ALLOW MULTIPLE PROJECTS, WE WILL FETCH PROJECTS USING PROJECT NAME.
    // FOR NOW, WE ARE SURE TO RETURN THE FIRST PROJECT
    const user = await User.findOne({ where: { username:"root" }});
    const projects = await user.getProjects({
        limit: 1,
        include: [
          {
            model: Attribute,
            include: [AttributeValue],
          },
          DataItem,
        ],
      });
    const project = projects[0];
    // const projectJson = project.toJSON();
    const attributeList = project.attributes;
    const attributeNameList = attributeList.map(at=>at.attributeName);
    let attributeValsList = attributeList.map(at=>{
        return at.attributeValues.map(atval=>atval.attributeValueName);
    });
    const dataItemList = project.dataItems.map(di=>{
        let obj = {
            "dataTimeseriesRow":di.row,
            "dataTimeseriesColumn": di.col,
            "value":di.value
        };
        return obj;
    });
    const columnCount = project.columnCount;
    console.log(attributeNameList);
    console.log(attributeValsList);
    console.log(dataItemList);

    return {"attributes":attributeNameList,
    "attributeCount":attributeNameList.length,
    "attributeValues":attributeValsList,
    "timeseriesData":dataItemList,
    columnCount
    };
}


module.exports = {saveNewProjectData, saveExistingProjectTimeSeriesData, checkifProjectExists, getAllDataOfProject};
