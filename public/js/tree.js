// tree.js

class Node {
    constructor(label) {
        this.label = label;
        this.index = null;
        this.children = [];
        this.parent = null;
    }

    addChild(childNode) {
        childNode.parent = this;
        this.children.push(childNode);
    }
}

function constructTree(attributes, attributeValues) {
    let root = new Node("Grand Total");
    let currentLevel = [];
    let nextLevel = [];
    currentLevel.push(root);

    attributeValues.forEach(targetArray => {
        nextLevel = [];
        currentLevel.forEach(node => {
            targetArray.forEach(target => {
                let newNode = new Node(target);
                nextLevel.push(newNode);
                node.addChild(newNode);
            })
        });
        currentLevel = nextLevel;
    });

    let i = 1;
    function exploreTree(node) {
        node.children.forEach(child => {
            exploreTree(child);
        })
        node.index = i;
        i++;
    }

    exploreTree(root);
    return root;
}

function findInTree(rowId, currentNode) {
    if (currentNode.index == rowId) {
        return currentNode;
    }
    let childToExpand = currentNode.children.find(node => node.index >= rowId);
    if (childToExpand) {
        return findInTree(rowId, childToExpand);
    }
    return null;
}

function getParent(rowId, root) {
    // console.log('hi')
    let node = findInTree(rowId, root);
    if (node && node.parent) {
        // console.log(node.parent.index)
        return node.parent.index;
    }
    return null;
}

function getChildren(rowId, root) {
    let node = findInTree(rowId, root);
    let result = [];
    if (node) {
        result = node.children.map(child => child.index);
        return result;
    }
    return result;
}

function getAllParents(rowId, root) {
    const parents = [];
    let parentIndex = getParent(rowId, root);

    while (parentIndex !== null) {
        parents.push(parentIndex);
        parentIndex = getParent(parentIndex, root);
    }

    return parents;
}

// function getSiblings(rowId, root) {
//     const parentIndex = getParent(rowId, root);
//     const parentNode = findInTree(parentIndex, root);

//     if (parentNode) {
//         const siblings = parentNode.children
//             .filter(child => child.index !== rowId)
//             .map(sibling => sibling.index);
//         return siblings;
//     }

//     return [];
// }


function getSiblings(rowId, root, processedNodes = new Set()) {
    const parentIndex = getParent(rowId, root);
    
    if (parentIndex === null || processedNodes.has(parentIndex)) {
        return [];
    }

    const parentNode = findInTree(parentIndex, root);
    const siblings = parentNode
        ? parentNode.children
            .filter(child => child.index !== rowId)
            .map(sibling => sibling.index)
        : [];

    // Mark the parent node as processed to avoid infinite recursion
    processedNodes.add(parentIndex);

    // Recursively find siblings of siblings
    const siblingsOfSiblings = siblings.flatMap(sibling =>
        getSiblings(sibling, root, processedNodes)
    );

    return [...siblings, ...siblingsOfSiblings];
}


export { constructTree, getParent, getChildren, getAllParents, getSiblings };
