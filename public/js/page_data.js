import{
    postData
} from "./api_caller.js";

// Function to get rows from tables based on data attributes
function getAllTimeSeriesData() {
    // Get all tables in the document
    var tables = document.querySelectorAll('table[data-timeseries-column]');
    // Array to store data item values
    var selectedDataValues = [];
    tables.forEach(function(table) {
        var dataTimeSeriesColumn = table.getAttribute('data-timeseries-column');
        var rows = table.querySelectorAll('tr[data-timeseries-row]');
        rows.forEach(function(row) {
            var dataTimeSeriesRow = row.getAttribute('data-timeseries-row');
            if (dataTimeSeriesRow !== null && dataTimeSeriesRow !== undefined) {
                // get inner input element's value
                var inputElement = row.querySelector('input.value');
                var value = inputElement.value;
                // const childInput = table.querySelector(
                //     `[data-timeseries-row="${dataTimeSeriesRow}"] input.value`
                //   );
                // const value = childInput.value;
                selectedDataValues.push({
                    dataTimeSeriesColumn: dataTimeSeriesColumn,
                    dataTimeSeriesRow: dataTimeSeriesRow,
                    value: value
                });
            }
        });
    });
    // console.log(selectedDataValues);
    const columnCount = tables.length;
    return {selectedDataValues, columnCount};
}

function getLatestTimeSeriesData() {
    // only last table is or interest
    const timeseriesContainer = document.getElementById("timeseries-container");
    const lastTable = timeseriesContainer.lastChild;
    // Array to store data item values
    var selectedDataValues = [];
    var dataTimeSeriesColumn = lastTable.getAttribute('data-timeseries-column');
    var rows = lastTable.querySelectorAll('tr[data-timeseries-row]');
    rows.forEach(function(row) {
        var dataTimeSeriesRow = row.getAttribute('data-timeseries-row');
        if (dataTimeSeriesRow !== null && dataTimeSeriesRow !== undefined) {
            // get inner input element's value
            var inputElement = row.querySelector('input.value');
            var value = inputElement.value;
            // const childInput = table.querySelector(
            //     `[data-timeseries-row="${dataTimeSeriesRow}"] input.value`
            //   );
            // const value = childInput.value;
            selectedDataValues.push({
                dataTimeSeriesColumn: dataTimeSeriesColumn,
                dataTimeSeriesRow: dataTimeSeriesRow,
                value: value
            });
        }
    });
    // console.log(selectedDataValues);
    const columnCount = lastTable.getAttribute("data-timeseries-column");
    return {selectedDataValues, columnCount};
}

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click",()=>{
    // if old project: new-project-data-input div will not be defined
    let newProject = true;
    const newProjectInputDiv = document.getElementById("new-project-data-input");
    if(!newProjectInputDiv){
        newProject = false;
    } 
    let data = null;
    // get time series data
    if(newProject){
        data = getAllTimeSeriesData();
    } else{
        data = getAllTimeSeriesData();
    }
    // post to server
    postData(newProject,data.selectedDataValues, data.columnCount);
})

export {getAllTimeSeriesData, getLatestTimeSeriesData};