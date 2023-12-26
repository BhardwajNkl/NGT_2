import{
    getData
} from "./api_caller.js";
import{
    setInput
} from "./input.js";
import{
    createLabelTable,
    createTimeColumn
} from "./timeseries.js"

// check if we need to load existing project
// if new-project-data-input div is not defined, then we need.
const newProjectDataInputDiv = document.getElementById("new-project-data-input");

if(!newProjectDataInputDiv){
    const loadedProjectData = await getData();
    setInput(loadedProjectData.attributes,loadedProjectData.attributeCount,loadedProjectData.attributeValues);
    let columnCount = loadedProjectData.columnCount;
    // call create label table
    createLabelTable();
    // create timeseries columns. 
    for (let i = 0; i < columnCount; i++) {
          createTimeColumn();      
    }

    // and fit data in the tables
    const timeseriesData = loadedProjectData.timeseriesData;
    var tables = document.querySelectorAll('table[data-timeseries-column]');
    timeseriesData.forEach(dataItem => {
        console.log(dataItem );
        const requiredTable = tables[dataItem.dataTimeseriesColumn-1];
        const childInput = requiredTable.querySelector(
                    `[data-timeseries-row="${dataItem.dataTimeseriesRow}"] input.value`
                  );
        childInput.value = dataItem.value;
    });
}