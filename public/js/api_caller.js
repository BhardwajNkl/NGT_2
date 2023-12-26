import{
    attributes, attributeCount, attributeValues
} from "./input.js";
const postData = (newProject,selectedDataValues, columnCount)=>{
      
    let dataToPost = null;
    if(newProject){
        dataToPost = {
            "projectType":"new",
            "attributes":attributes,
            "attributeValues":attributeValues,
            "attributeCount":attributeCount,
            "timeseriesData":selectedDataValues,
            "columnCount":columnCount
        }
    } else{
        dataToPost = {
            "projectType":"old",
            "timeseriesData":selectedDataValues,
            "columnCount":columnCount
        }
    }
    fetch("/data",
        {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(dataToPost)
        }
    ).then(success=>{
        console.log("posted")
    }).catch(error=>{
        console.log("error")
    })
}

const getData = async ()=>{
    let res =null;
    const mydata = await fetch("/data", 
        {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
    );

    res = await mydata.json();
    return res;

}
export {postData, getData}