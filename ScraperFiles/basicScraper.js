let axios = require('axios');
let cheerio = require('cheerio');
const url = "https://m.albert.nyu.edu/app/catalog/classsection/NYUNV";
const postURL = "http://localhost:5000/database/addData";

let yearValue = "/1198/";
let courseValue = process.argv[2];
let urlNew = url + yearValue + courseValue;

//==============
//Fields for searching

let topicFlag = true;
let units = 0;

//======================================================================
//Functions for scrapping html and inserting into database

/**
 * This function fetches html from a specific course on nyu mobile course search
 */
fetchData = () => {
    axios.get(urlNew)
    .then((res) => {

        if(res.status == 200)
        {
            //Successfully found course page
            console.log(`statusCode: ${res.status}`)

            let jsonObj = parseHTML(res.data);

            if(jsonObj == null)
            {
                //The course page doesn't have a course and is null
                return null;
            }
            else
            {
                // postDatabase(jsonObj);
                console.log("Should post but edited out to debug program");
            }

            // console.log(jsonObj);

            return jsonObj;
        }
        else
        {
            //Failed to find a course
            console.log("Found nothing");
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

/**
 * Formats the raw html from fetchData
 */
parseHTML = (html) => {
    const $ = cheerio.load(html);

    let title = $(".primary-head");
    let right = $("div .pull-right").find("div");
    let left = $("div .pull-left").find(".strong");

    // title = title[0].children[0].data.trim();
    // console.log(title);

    jsonObj = {
        name: "null",
        location: "null",
        school: "null",
        time: "null",
        course_number: "null",
        department: "null",
        description: "null"
    }

    // console.log(right[2].children);

    if(left.length === 0 || right.length === 0)
    {
        console.log("Class " + yearValue + courseValue + " not valid");
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
                // console.log(left[i].children[0].data + " " + right[i].children[0].data);
                // jsonObj = getJSON(left[i].children[0].data, right[i].children[0].data, jsonObj);
                console.log(left[i].children[0].data + ": " + right[i].children[0].data);
            }
            
            // console.log(left[i].children[0].data + ": " + right[i].children[0].data);
        }
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
        units = value;
        console.log(units);
    }
    else if(key === "Components" && value != undefined)
    {
        if(value == undefined)
        {

        }
        else
        {   
            console.log(value);
        }
        
    }

    return jsonObj;
}

main = () => {
    if(process.argv[2] === undefined)
    {
        console.log("You need to enter arguments for a class number");
        return 0;
    }
    
    fetchData();

    
}
//=======================================================================

main();



