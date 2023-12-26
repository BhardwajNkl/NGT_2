import {
    constructTree,
} from "./tree.js";
import {
    createLabelTable,
} from "./timeseries.js";

var attributeCount = 0;
var attributes = [];
var attributeValues = [];
var treeRoot = null;

const addAttributeBtn = document.getElementById("add-attribute-btn");
const proceedBtn = document.getElementById("proceed-btn");

const attributeInputDiv = document.getElementById("attribute-input-div");

if(addAttributeBtn && proceedBtn){
    addAttributeBtn.addEventListener("click", () => {
        const containerDiv = document.createElement("div");
        containerDiv.setAttribute("class", "attribute-input-container");

        const nameDiv = document.createElement("div");
        nameDiv.setAttribute("class", "attribute-input");

        const attributeNameLabel = document.createElement("label");
        attributeNameLabel.innerHTML = "Attribute: ";
        const attributeNameInput = document.createElement("input");
        attributeNameInput.setAttribute("class", "input-field attribute-name");

        nameDiv.appendChild(attributeNameLabel);
        nameDiv.appendChild(attributeNameInput);

        const valueDiv = document.createElement("div");
        valueDiv.setAttribute("class", "attribute-input");

        const attributeValuesLabel = document.createElement("label");
        attributeValuesLabel.innerHTML = "Attribute Values: ";
        const attributeValuesInput = document.createElement("input");
        attributeValuesInput.setAttribute("class", "input-field attribute-values");

        valueDiv.appendChild(attributeValuesLabel);
        valueDiv.appendChild(attributeValuesInput);

        containerDiv.appendChild(nameDiv);
        containerDiv.appendChild(valueDiv);

        attributeInputDiv.appendChild(containerDiv);
        attributeInputDiv.appendChild(document.createElement("br"));
    });


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
}

const setInput = (attribs, attribCount, attribVals)=>{
    attributes = attribs;
    attributeCount = attribCount;
    attributeValues = attribVals;
    // also set tree root
    treeRoot = constructTree(attributes, attributeValues);
}

export {attributes, attributeCount, attributeValues, treeRoot, setInput};