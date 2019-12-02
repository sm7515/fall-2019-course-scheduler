var scrape = require("./basicScraper");
var fs = require('fs');
var sleep = require('sleep');

let jsonObj = JSON.parse(fs.readFileSync('./CAS_Data/CAS14.json', 'utf8'));
// let classArr = [7667,7670,9100,24536,24580,19674];

async function main()
{
    var count = 0;
    // Loop through file of data
    for(var i = 0; i < jsonObj.length; i++)
    {
        for(var j = 0; j < jsonObj[i].classIds.length; j++)
        {
            await scrape.main(jsonObj[i].yearId, jsonObj[i].classIds[j], jsonObj[i].name);
            // console.log(jsonObj[i].yearId, jsonObj[i].classIds[j], jsonObj[i].name);
            // sleep.sleep(1);

            count++;
        }
        
    }

    console.log(count);
}

main();