// experiment code
import {
    constructTree,
} from "./tree.js";
import {
    createLabelTable,
} from "./timeseries.js";

// experiment end

var attributeCount = 0;
var attributes = [];
var attributeValues = [];
var treeRoot = null;

const addAttributeBtn = document.getElementById("add-attribute-btn");
const proceedBtn = document.getElementById("proceed-btn");

const attributeInputDiv = document.getElementById("attribute-input-div");

addAttributeBtn.addEventListener("click", ()=>{
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class","attribute-input");

    const attributeNameInput = document.createElement("input");
    attributeNameInput.setAttribute("class","attribute-name")
    const attributeValuesInput = document.createElement("input");
    attributeValuesInput.setAttribute("class","attribute-values");

    newDiv.appendChild(attributeNameInput);
    newDiv.appendChild(attributeValuesInput);

    attributeInputDiv.appendChild(newDiv);
})

proceedBtn.addEventListener("click", ()=>{

    // reset old input data
    attributeCount = 0;
    attributes = [];
    attributeValues = [];

    // get values from page
    const attributeNameElements = document.getElementsByClassName("attribute-name");
    const attributeValuesElements = document.getElementsByClassName("attribute-values");
    
    // construct the tabular view for users
    for (let i = 0; i < attributeNameElements.length; i++) {
        const element = attributeNameElements[i];
        const attributeName = element.value;
        attributes.push(attributeName);
    }

    for (let i = 0; i < attributeValuesElements.length; i++) {
        const element = attributeValuesElements[i];
        const attributeValueList = element.value;
        const valueArray = attributeValueList.split(",");
        attributeValues.push(valueArray);
    }

    attributeCount = attributes.length;

    // make the input screen invisible
    const newProjectDataInput = document.getElementById("new-project-data-input");
    const loadProject = document.getElementById("load-project");
    newProjectDataInput.style.display = "none";
    loadProject.style.visibility = "visible"
    // all inputs available
    // construct the working table in front of user
    treeRoot = constructTree(attributes, attributeValues);
    createLabelTable();
})

export {attributes, attributeCount, attributeValues, treeRoot};