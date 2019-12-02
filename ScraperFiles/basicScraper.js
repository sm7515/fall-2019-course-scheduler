let axios = require('axios');
let cheerio = require('cheerio');
const url = "https://m.albert.nyu.edu/app/catalog/classsection/NYUNV";
const postURL = "http://localhost:5000/database/addData";

// For module exports

var exports = module.exports = {};

//==============
//Fields for searching

let topicFlag = true;
let units = 0;

//======================================================================
//Functions for scrapping html and inserting into database

/**
 * This function fetches html from a specific course on nyu mobile course search
 */
async function fetchData(yearID, classID, department)
{

    let urlNew = url + "/" + yearID + "/" + classID;

    console.log(urlNew);

    axios.get(urlNew)
    .then((res) => {

        if(res.status == 200)
        {
            //Successfully found course page
            console.log(`Sucessfully fetched: ${res.status}`)

            let jsonObj = parseHTML(res.data, yearID, department, classID);

            if(jsonObj == null)
            {
                //The course page doesn't have a course and is null
                return null;
            }
            else
            {
                // console.log("Have not posted to database")
                // console.log(jsonObj);
                // console.log("\n\n\n\n")
                
                postDatabase(jsonObj);
                return jsonObj;
            }
        }
        else
        {
            //Failed to find a course
            console.log("Error: webpage does not exist");
            return null;
        }
    })
    .catch((error) => {
    console.error(error)
    })
}

/**
 * After fetching and formatting data, the data is sent to server database with API endpoints
 */
postDatabase = (jsonObj) => {
    axios.post(postURL, jsonObj)
        .then(function(res){
            if(res.status === 200)
            {
                console.log("Sucessfully store in database");
            }
            else 
            {
                console.log("Failed to store in database");
            }
        })
        .catch(function(error){
            console.log(error);
        })
}

formatDepartment = (departmentStr) =>
{
    var index = departmentStr.indexOf(" ");

    return departmentStr.substring(0,index);
}

/**
 * Formats the raw html from fetchData
 */
parseHTML = (html, yearID, departmentFullName, classID) => {
    const $ = cheerio.load(html);

    let title = $(".primary-head");
    let right = $("div .pull-right").find("div");
    let left = $("div .pull-left").find(".strong");

    let component = $(".PSTEXT");
    let department = $(".page-title");

    department = formatDepartment(department[0].children[0].data);

    jsonObj = {
        name: "null",
        location: "null",
        school: "null",
        time: "null",
        units: -1,
        course_number: "null",
        department: department + " (" + departmentFullName + ")",
        description: "null",
        component: "null",
        year_id: yearID
    }

    if(left.length === 0 || right.length === 0)
    {
        console.log("Class " + yearID + " " + classID + " not valid");
        return null;
    }

    jsonObj = getJSON("title", title[0].children[0].data.trim(), jsonObj);
    
    for(var i = 0; i < left.length; i++)
    {

        if(left[i].children[0].type === "text")
        {
            //Do one more error check
            if(right[i].children.length === 0)
            {
                jsonObj = getJSON(left[i].children[0].data, "", jsonObj);
                // console.log("Error " + left[i].children[0].data)
            }
            else
            {
                jsonObj = getJSON(left[i].children[0].data, right[i].children[0].data, jsonObj);
            }
            
            // console.log(left[i].children[0].data + ": " + right[i].children[0].data);
        }
    }

    if(component[0] != undefined && component[0].children != undefined && component[0].children[0].children != undefined && component[0].children[0].children[0].children != undefined)
    {
        jsonObj = getJSON("Components",component[0].children[0].children[0].children[0].data, jsonObj)
    }
    
    // console.log(jsonObj);
    return jsonObj;
}



/**
 * Further formats the raw html and creates a json object
 */
getJSON = (key, value, jsonObj) => {


    if(key === "title" && jsonObj.name === "null")
    {   
        jsonObj.name = value;
    }
    else if(key === "Class Number" && jsonObj.course_number === "null")
    {
        jsonObj.course_number = value;
    }
    else if(key === "Room" && jsonObj.location === "null")
    {
        jsonObj.location = value;
    }
    else if(key === "Meets" && jsonObj.time === "null")
    {
        jsonObj.time = value;
    }
    else if(key === "Description" && jsonObj.description === "null")
    {
        jsonObj.description = value;
    }
    else if(key === "Topic" && jsonObj.name.includes("Special"))
    {
        jsonObj.name = value;
    }
    else if(key === "Grading" && jsonObj.department === "null")
    {
        jsonObj.school = value;
    }
    else if(key === "Notes" && value.length > jsonObj.description.length)
    {
        jsonObj.description = value;
    }
    else if(key === "Units")
    {
        //Has units
        jsonObj.units = Number(value.charAt(0));
        // console.log(typeof units);
    }
    else if(key === "Components" && value != undefined)
    {
        if(value == undefined)
        {

        }
        else if(value.includes("Recitation") || value.includes("Lecture"))
        {   
            if(jsonObj.units === 0)
            {
                // console.log(jsonObj.units);
                jsonObj.component = "Recitation";
            }
            else
            {
                jsonObj.component = "Lecture";
            }
        }
        else if(value.includes("Seminar"))
        {
            jsonObj.component = "Seminar";
        }
        
    }

    return jsonObj;
}

//=======================================================================

exports.main = function(yearID, classID, department){

    fetchData(yearID, classID, department);
    
}



