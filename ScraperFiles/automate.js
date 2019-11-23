var scrape = require("./basicScraper");
var fs = require('fs');

let jsonObj = JSON.parse(fs.readFileSync('classIDS.json', 'utf8'));
// let classArr = [7667,7670,9100,24536,24580,19674];


function main()
{
    for(var i = 0; i < jsonObj.length; i++)
    {
        for(var j = 0; j < jsonObj[i].classId.length; j++)
        {
            scrape.main(jsonObj[i].yearID, jsonObj[i].classId[j]);
        }
        
    }
}

main();