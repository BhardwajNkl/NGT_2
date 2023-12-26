import {
  constructTree,
  getParent,
  getChildren,
  getAllParents,
  getSiblings,
} from "./tree.js";

import { dataManipulation } from "./dataManipulation.js";
import { attributes, attributeCount, attributeValues, treeRoot } from "./input.js";
import { setLastClickedCell } from './shared.js';

// // Sample Input 1
// const attributes = new Array("country", "gender", "age group");
// const attributeCount = 3;
// const attributeValues = [];
// attributeValues.push(new Array("india", "australia", "america"));
// attributeValues.push(new Array("male", "female"));
// attributeValues.push(new Array("20-40", "40-60", "60-80"));

// // Construct the tree for Sample Input 1
// const treeRoot = constructTree(attributes, attributeValues);

function nestedForEach(arrays, callback, currentDepth = 0, currentValues = []) {
  if (currentDepth === arrays.length) {
    // Base case: if the current depth is equal to the number of arrays, execute the callback
    callback(currentValues);
  } else {
    // Recursive case: iterate over the current array and call the function for the next depth
    arrays[currentDepth].forEach((value) => {
      const newValues = [...currentValues, value];
      nestedForEach(arrays, callback, currentDepth + 1, newValues);
    });
  }
}

// label-container
const createLabelTable = () => {
  // 1. table create
  const labelTable = document.createElement("table");

  // 2. create tabel head
  const labelTableHead = document.createElement("tr");
  attributes.forEach((label) => {
    const cell = document.createElement("th");
    cell.innerHTML = label;
    labelTableHead.appendChild(cell);
  });
  labelTable.appendChild(labelTableHead);

  // 3. intermidiate rows

  /*
    TOTALS ARRAY: confusing naming hai. and working bhi explain nahi kar raha mai.
    >> ye use kiya hai taaki mujhe pata chale ki jab loop me main rows generate kar raha hu,
        to after how many rows, ek extra total ki row banani hogi.
    */
  let totals = new Array(attributeCount - 1);
  // setting the last entry manually
  let j = 1;
  totals[attributeCount - 2] = attributeValues[attributeCount - j].length;
  j++;
  for (let i = totals.length - 2; i >= 0; i--) {
    totals[i] = totals[i + 1] * attributeValues[attributeCount - j].length;
    j++;
  }

  let count = 0;
  nestedForEach(attributeValues, (data) => {
    const row = document.createElement("tr");
    data.forEach((d) => {
      const cell = document.createElement("td");
      cell.innerHTML = d;
      row.appendChild(cell);
    });
    labelTable.appendChild(row);
    count++;

    const matchedTotals = totals.filter((t) => count % t == 0);
    if (matchedTotals.length == 3) {
      console.log(matchedTotals);
    }
    matchedTotals.reverse();
    if (matchedTotals.length == 3) {
      console.log(matchedTotals);
    }
    matchedTotals.forEach((matchedTotal) => {
      // total row for a particular label
      const index = totals.findIndex((t) => t == matchedTotal);
      const totalRow = document.createElement("tr");
      const totalCell = document.createElement("th");
      totalCell.innerHTML = attributes[index] + " total";
      totalRow.appendChild(totalCell);
      labelTable.appendChild(totalRow);
    });
  });

  // 4. bottom row for grand total
  const labelTableGrandTotalRow = document.createElement("tr");
  const cell = document.createElement("th");
  cell.innerHTML = "Grand total";
  labelTableGrandTotalRow.appendChild(cell);
  labelTable.appendChild(labelTableGrandTotalRow);

  // 5. append the table in the container
  const labelTableContainer = document.getElementById("label-container");
  labelTableContainer.appendChild(labelTable);
};

// createLabelTable();

// HANDLING CREATE NEW TIME SERIES COLUMN
let timeseriesColumnCounter = 0;
let timeseriesRowCounter = 1;
let timeseriesId;

const createTimeColumn = () => {
  timeseriesColumnCounter++;
  timeseriesRowCounter = 1;
  // 1. table create
  const timeTable = document.createElement("table");
  timeseriesId = timeseriesColumnCounter;
  timeTable.id = 'timeseriesTable'
  timeTable.setAttribute("data-timeseries-column", timeseriesColumnCounter);

  // 2. create table head
  const timeTableHead = document.createElement("tr");
  const timeHeadCell = document.createElement("th");
  timeHeadCell.innerHTML = "time";
  timeTableHead.appendChild(timeHeadCell);
  timeTable.appendChild(timeTableHead);

  // 3. intermediate rows:

  let totals = new Array(attributeCount - 1);
  // setting the last entry manually
  let j = 1;
  totals[attributeCount - 2] = attributeValues[attributeCount - j].length;
  j++;
  for (let i = totals.length - 2; i >= 0; i--) {
    totals[i] = totals[i + 1] * attributeValues[attributeCount - j].length;
    j++;
  }

  // Function to handle input events
  const inputEventListener = (event) => {
    dataManipulation(event,treeRoot)
  }
  
  let count = 0;
  nestedForEach(attributeValues, (data) => {
    const row = document.createElement("tr");
    row.setAttribute("data-timeseries-row", timeseriesRowCounter++);
    const cell = document.createElement("td");
    cell.innerHTML = "<input class='value paste-target'>";
    row.appendChild(cell);
    timeTable.appendChild(row);
    count++;

    const matchedTotals = totals.filter((t) => count % t == 0);
    if (matchedTotals.length == 3) {
      console.log(matchedTotals);
    }
    matchedTotals.reverse();
    if (matchedTotals.length == 3) {
      console.log(matchedTotals);
    }
    matchedTotals.forEach((matchedTotal) => {
      // total row for a particular label
      const index = totals.findIndex((t) => t == matchedTotal);
      const totalRow = document.createElement("tr");
      totalRow.setAttribute("data-timeseries-row", timeseriesRowCounter++);
      const totalCell = document.createElement("th");
      totalCell.innerHTML = "<input class='value paste-target'>";
      totalRow.appendChild(totalCell);
      timeTable.appendChild(totalRow);
    });
  });

  // 4. bottom row for grand total
  const timeTableGrandTotalRow = document.createElement("tr");
  timeTableGrandTotalRow.setAttribute(
    "data-timeseries-row",
    timeseriesRowCounter++
  );
  const grandTotalCell = document.createElement("th");
  grandTotalCell.innerHTML = "<input class='value paste-target'>";
  timeTableGrandTotalRow.appendChild(grandTotalCell);
  timeTable.appendChild(timeTableGrandTotalRow);

  // 5. append the table in the container

  const timeSeriesTableContainer = document.getElementById(
    "timeseries-container"
  );
  timeSeriesTableContainer.appendChild(timeTable);

  // Add event listeners to input fields in the timeseries table
  const inputFields = timeTable.querySelectorAll("input.value, input.value");

  // Clear existing event listeners
  document.addEventListener("keydown", inputEventListener);
  inputFields.forEach((inputField) => {
    inputField.removeEventListener("input", inputEventListener);
    inputField.removeEventListener("click", inputEventListener);
  });

  inputFields.forEach((inputField) => {
    inputField.addEventListener('input', function (event) {
      setLastClickedCell(event);
      console.log('event',event)
      console.log('if',inputField)
      inputEventListener(event);
    });
  
    inputField.addEventListener('click', function (event) {
      setLastClickedCell(event);
    });
  });

}
const btn = document.getElementById("create-time-column-btn");
btn.addEventListener("click", createTimeColumn);


export {createLabelTable}
