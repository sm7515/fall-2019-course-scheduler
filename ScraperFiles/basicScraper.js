let axios = require('axios');
let cheerio = require('cheerio');
const url = "https://m.albert.nyu.edu/app/catalog/classsection/NYUNV";
const postURL = "http://localhost:5000/database/addData";

let yearValue = "/1204/";
let courseValue = process.argv[2];
let urlNew = url + yearValue + courseValue;

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
                postDatabase(jsonObj);
            }

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
            jsonObj = getJSON(left[i].children[0].data, right[i].children[0].data, jsonObj);
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
    if(key === "title")
    {   
        jsonObj.name = value;
    }
    else if(key === "Class Number")
    {
        jsonObj.course_number = value;
    }
    else if(key === "Room")
    {
        jsonObj.location = value;
    }
    else if(key === "Meets")
    {
        jsonObj.time = value;
    }
    else if(key === "Description")
    {
        jsonObj.description = value;
    }
    else if(key === "Grading")
    {
        jsonObj.department = value;
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



