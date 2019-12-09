var scrape = require("./basicScraper");
var fs = require('fs');
var sleep = require('sleep');


// let classArr = [7667,7670,9100,24536,24580,19674];

let collegeList = [ 'Select School/College',
'Coll of Global Public Health - Grad',
'Coll of Global Public Health-UGRD',
'College of Arts and Science',
'College of Dentistry - Cont Ed',
'College of Dentistry - Grad',
'College of Dentistry - Undergrad',
'Ctr for Urban Sci and Progress',
'Gallatin - Grad',
'Gallatin - Undergrad',
'Graduate School of Arts and Science',
'Liberal Studies',
'NC Tisch School of the Arts',
'NYU Abu Dhabi - Undergrad',
'NYU Shanghai - Undergrad',
'Rory Meyers College of Nursing-Grad',
'Rory Meyers College of Nursing-UGRD',
'SPS - Diploma',
'SPS - Grad',
'SPS - Undergrad',
'Silver School - Grad',
'Silver School - Undergrad',
'Steinhardt - Graduate',
'Steinhardt - Undergraduate',
'Stern - Grad',
'Stern - Undergrad',
'Tandon - Grad',
'Tandon - Undergrad',
'Tisch - Grad',
'Tisch - Undergrad',
'Wagner - Grad' ]

async function main()
{
    var count = 0;
    // Loop through file of data

    for(var z = 1; z < collegeList.length; z++)
    {
        let collegeName = collegeList[z];
        let jsonObj = JSON.parse(fs.readFileSync("./selenium/" + collegeName + ".json", 'utf8'));

        for(var i = 0; i < jsonObj.length; i++)
        {
            for(var j = 0; j < jsonObj[i].classIds.length; j++)
            {
                await scrape.main(jsonObj[i].yearId, jsonObj[i].classIds[j], jsonObj[i].name, collegeName);
                count++;
            }
        }
    }
    console.log(count);
}

main();