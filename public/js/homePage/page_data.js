import{
    postData
} from "./api_caller.js";

// Function to get timeseries data values from tables based on data attributes
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
                var inputElement = row.querySelector('input.value');
                var value = inputElement.value;
                selectedDataValues.push({
                    dataTimeSeriesColumn: dataTimeSeriesColumn,
                    dataTimeSeriesRow: dataTimeSeriesRow,
                    value: value
                });
            }
        });
    });
    const columnCount = tables.length;
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
    let data = getAllTimeSeriesData();
    // post to server
    postData(newProject,data.selectedDataValues, data.columnCount);
})

export {getAllTimeSeriesData};