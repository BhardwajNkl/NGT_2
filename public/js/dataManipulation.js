import {
    getParent,
    getChildren,
    getAllParents,
  } from "./tree.js";
  

function dataManipulation(event,treeRoot) {
  const inputField = event.target;
  const rowId = parseInt(
    inputField.closest("tr").getAttribute("data-timeseries-row")
  );

  const parentRowIds = getAllParents(rowId, treeRoot);
  const childrenRowIds = getChildren(rowId, treeRoot);
  const timeseriesIdclicked = parseInt(
    inputField.closest("table").getAttribute("data-timeseries-column")
  );

  // Update all parent inputs
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
    if (event.key == "Enter") {
      updateChildrenRecursively(childRowId, parentInput);
    }
  });
}

export { dataManipulation }