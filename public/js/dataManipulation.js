import { getParent, getChildren, getAllParents } from "./utils/tree.js";
import { getLastClickedCell } from './utils/shared.js';

function dataManipulation(event, treeRoot) {
  const inputField = event.target;
  const rowId = parseInt(
    inputField.closest("tr").getAttribute("data-timeseries-row")
  );

  const parentRowIds = getAllParents(rowId, treeRoot);
  const childrenRowIds = getChildren(rowId, treeRoot);
  const timeseriesIdclicked = parseInt(
    inputField.closest("table").getAttribute("data-timeseries-column")
  );

  parentRowIds.forEach((parentRowId) => {
    const timeseriesTable = document.querySelector(
      `table[data-timeseries-column="${timeseriesIdclicked}"]`
    );
    const parentInput = timeseriesTable.querySelector(
      `[data-timeseries-row="${parentRowId}"] input`
    );

    if (parentInput) {
      // If updating a parent, calculate the sum of all child rows
      const childrenRowIds = getChildren(parentRowId, treeRoot);
      const sumOfChildren = childrenRowIds.reduce((sum, childId) => {
        const timeseriesTableUpdate = document.querySelector(
          `table[data-timeseries-column="${timeseriesIdclicked}"]`
        );
        const childInput = timeseriesTableUpdate.querySelector(
          `[data-timeseries-row="${childId}"] input`
        );

        return sum + (childInput ? parseInt(childInput.value) || 0 : 0);
      }, 0);
      console.log(`Sum of children: ${sumOfChildren}`);
      parentInput.value = sumOfChildren;
    }
  });

  // Update children's input recursively
  const allChildrenEmptyOrZero = childrenRowIds.every((childRowId) => {
    const timeseriesTable = document.querySelector(
      `table[data-timeseries-column="${timeseriesIdclicked}"]`
    );
    const currentChildInput = timeseriesTable.querySelector(
      `[data-timeseries-row="${childRowId}"] input`
    );
    return (
      currentChildInput.value === "" || parseInt(currentChildInput.value) === 0
    );
  });

  const calculateSumOfChildren = (timeseriesId) => {
    const childrenRowIds = getChildren(rowId, treeRoot);
    console.log("ids", childrenRowIds);
    const sumOfChildren = childrenRowIds.reduce((sum, childId) => {
      const timeseriesTable = document.querySelector(
        `table[data-timeseries-column="${timeseriesId}"]`
      );
      console.log("tii", timeseriesId);
      const childInput = timeseriesTable.querySelector(
        `[data-timeseries-row="${childId}"] input`
      );
      console.log("ci", childInput.value);
      return sum + (childInput ? parseInt(childInput.value) || 0 : 0);
    }, 0);
    console.log("sc", sumOfChildren);
    return sumOfChildren;
  };

  const sumOfChildrenBeforeChange = calculateSumOfChildren(timeseriesIdclicked);
  let sumOfChildrenBeforeChangePrevTable;
  if (timeseriesIdclicked > 1) {
    sumOfChildrenBeforeChangePrevTable = calculateSumOfChildren(
      timeseriesIdclicked - 1
    );
  }

  const updateChildrenRecursively = (childId, parentInputBeforeChange) => {
    let childInput;
    let childValueBeforeChange;
    let ratio;
    let timeseriesTable;

    if (inputField.value !== "") {
      if (allChildrenEmptyOrZero) {
        timeseriesTable = document.querySelector(
          `table[data-timeseries-column="${timeseriesIdclicked - 1}"]`
        );
        childInput = timeseriesTable.querySelector(
          `[data-timeseries-row="${childId}"] input.value`
        );
        childValueBeforeChange = parseInt(childInput.value) || 0;
        ratio =
          sumOfChildrenBeforeChangePrevTable !== 0
            ? childValueBeforeChange / sumOfChildrenBeforeChangePrevTable
            : 0;
        timeseriesTable = document.querySelector(
          `table[data-timeseries-column="${timeseriesIdclicked}"]`
        );
        const currentChildInput = timeseriesTable.querySelector(
          `[data-timeseries-row="${childId}"] input`
        );
        const newValue = ratio * parseInt(parentInputBeforeChange.value);
        currentChildInput.value = newValue;
      } else {
        console.log("id1", timeseriesIdclicked);
        const timeseriesTable = document.querySelector(
          `table[data-timeseries-column="${timeseriesIdclicked}"]`
        );
        childInput = timeseriesTable.querySelector(
          `[data-timeseries-row="${childId}"] input`
        );
        childValueBeforeChange = parseInt(childInput.value) || 0;
        console.log("brfore change", childValueBeforeChange);
        ratio =
          sumOfChildrenBeforeChange !== 0
            ? childValueBeforeChange / sumOfChildrenBeforeChange
            : 0;
        const newValue = ratio * parseInt(parentInputBeforeChange.value);
        childInput.value = newValue;
      }
    }

    const grandchildrenRowIds = getChildren(childId, treeRoot);
    if (grandchildrenRowIds.length > 0) {
      // Update children's input recursively only if there are grandchildren
      grandchildrenRowIds.forEach((grandchildId) => {
        updateChildrenRecursively(grandchildId, parentInputBeforeChange);
      });
    }
  };

  childrenRowIds.forEach((childRowId) => {
    const parentRowId = getParent(childRowId, treeRoot);
    const timeseriesTable = document.querySelector(
      `table[data-timeseries-column="${timeseriesIdclicked}"]`
    );
    const parentInput = timeseriesTable.querySelector(
      `[data-timeseries-row="${parentRowId}"] input`
    );
    const childInput = timeseriesTable.querySelector(
      `[data-timeseries-row="${childRowId}"] input`
    );
    if (event.key == "Enter") {
      updateChildrenRecursively(childRowId, parentInput);
    }
  });
  
}
let copyOperationCompleted = false;
function copyData(event) {
  const inputField = event.target;
  const timeseriesIdclicked = parseInt(
    inputField.closest("table").getAttribute("data-timeseries-column")
  );
  console.log("clicked", timeseriesIdclicked);
  const timeTable = document.querySelector(
    `table[data-timeseries-column="${timeseriesIdclicked}"]`
  );
  const cellsInColumn = Array.from(
    timeTable.querySelectorAll(".paste-target")
  );

  // Extract data from cells and join into a newline-separated string
  const columnData = cellsInColumn.map((cell) => cell.value).join("\n");
  navigator.clipboard.writeText(columnData).then(() => {
    copyOperationCompleted = true;
    document.dispatchEvent(new Event('copyOperationCompleted'));
    updatePasteButtonState()
    alert('Data copied of colmn' + timeseriesIdclicked); // Display an alert after successful copy
  }).catch((error) => {
    console.error('Unable to copy data to clipboard', error);
  });
}

// Function to paste data to timeseries table
function pasteData(event) {
  const inputField = event.target;
  const timeseriesIdclicked = parseInt(
    inputField.closest("table").getAttribute("data-timeseries-column")
  );
  
  if (copyOperationCompleted) {
    console.log("id", timeseriesIdclicked);
    const timeTable = document.querySelector(
      `table[data-timeseries-column="${timeseriesIdclicked}"]`
    );
    const selectedCells = Array.from(
      timeTable.querySelectorAll(".paste-target")
    );

    // Read data from the clipboard
    navigator.clipboard
      .readText()
      .then((clipboardData) => {
        // Split the clipboard data into an array of lines
        const columnData = clipboardData
          .split("\n")
          .filter((line) => line.trim() !== "");

        // Check if the number of rows in the clipboard matches the number of selected cells
        if (columnData.length === selectedCells.length) {
          // Update the value of each selected input field with the corresponding data from the clipboard
          selectedCells.forEach((cell, index) => {
            if (cell) {
              // Access the input field directly by index
              cell.value = columnData[index] || "";
              cell.classList.add("paste-target");
            } else {
              console.error("Input field not found for cell:", cell);
            }
          });

          // Reset the copy operation state
          copyOperationCompleted = false;
          updatePasteButtonState();
        } else {
          alert(
            "Invalid paste data. Please make sure the copied data matches the number of rows."
          );
        }
      })
      .catch((error) => {
        console.error("Unable to read data from clipboard", error);
      });
  }else {
        console.log(
          "Invalid paste data. Please make sure the copied data matches the number of rows."
        );
      }
}

function updatePasteButtonState() {
  const pasteButton = document.getElementById('paste');

  if (copyOperationCompleted) {
    // Enable the Paste button
    pasteButton.classList.remove('paste-deactivated');
  } else {
    // Disable the Paste button
    pasteButton.classList.add('paste-deactivated');
  }
}

document.getElementById('copy').addEventListener('click', function () {
  const lastClickedCell = getLastClickedCell();
  if (lastClickedCell) {
    copyData(lastClickedCell);
  }
});

document.getElementById('paste').addEventListener('click', function () {
  const lastClickedCell = getLastClickedCell();
  if (lastClickedCell) {
    pasteData(lastClickedCell);
  }
});

export { dataManipulation };
