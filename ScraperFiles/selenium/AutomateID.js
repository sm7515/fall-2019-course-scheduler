const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
var sleep = require('sleep'); 

var fs = require('fs'); 
let collegeArray = [];

(async function example() {
  let driver = new webdriver.Builder().forBrowser('firefox').build();

  // Get Year
  await driver.get('https://m.albert.nyu.edu/app/catalog/classSearch/1204');

  sleep.sleep(1);
  const college = await driver.findElement(By.id("search-acad-group"));
  college.sendKeys("w");
  sleep.sleep(1);

  // Get college list
  const collegeName = await driver.findElement(By.name("acad_group")).getText();
  parseColleges(collegeName);

  console.log(collegeArray);

  // Uncheck open classes only
  await driver.findElement(By.className("search-check")).click();

  for(let z = 31; z < collegeArray.length+1; z++)
  {
    // Get College
    const college = await driver.findElement(By.id("search-acad-group"));
    college.sendKeys(Key.ARROW_DOWN);
    sleep.sleep(1);

    // Prepare college array
    let departmentArray = [];
    let objArray = [];

    const departmentName = await driver.findElement(By.name("subject")).getText();
    departmentArray = parseDepartments(departmentName, departmentArray);
    
    console.log(departmentArray);
    // Loop through each department
    for(var j = 1; j < departmentArray.length; j++)
    {
      // Change departments
      const department = await driver.findElement(By.name("subject"));
      department.sendKeys(Key.ARROW_DOWN);

      await driver.findElement(By.id("buttonSearch")).click();

      //Prepare new department
      var objDepartment = {
        name: departmentArray[j],
        yearId: 1204,
        classIds: []
      }

      sleep.sleep(9);

      let results = await driver.findElement(By.id("search-results"));
      results = await driver.findElements(By.className("section-content"))

      // sleep.sleep(2);

      let text = "";
      for(var i = 2; i < results.length; i++)
      {
          text = await results[i].getText();

          objDepartment.classIds = parseData(objDepartment.classIds, text);
      }

      console.log(collegeArray[z] + " : " + departmentArray[j] + " : " + objDepartment.classIds.length);
      objArray.push(objDepartment);
      sleep.sleep(1);
    }

    console.log("Writing to " + collegeArray[z]);

    fs.writeFile(collegeArray[z] + ".json", JSON.stringify(objArray, null, 2), function(err) {

      if(err) {
          return console.log(err);
      }

      console.log("The file written "  + collegeArray[z]);
    }); 

    sleep.sleep(2);
  }

  driver.quit();
  
})();

function parseColleges(strData)
{
  while(strData.indexOf("\n") != -1)
  {
    var index = strData.indexOf("\n");

    var collegeName = strData.substring(0, index);

    strData = strData.slice(index+1);
    if(strData !== "Select School/College")
    {
      collegeArray.push(collegeName);
    }
  }
}

function parseDepartments(strData, departmentArray)
{
  while(strData.indexOf("\n") != -1)
  {
    var index = strData.indexOf("\n");

    var department = strData.substring(0, index);
    strData = strData.slice(index+1);
    if(strData !== "Select Subject")
    {
      departmentArray.push(department);
    }
  }

  departmentArray.push(strData);

  return departmentArray;
}

function parseData(array, strData)
{
  var firstBra = strData.indexOf("(");
  var secondBra = strData.indexOf(")");

  var num = Number(strData.substring(firstBra + 1,secondBra));
  if(num != 0)
  {
    array.push(num);
  }

  return array;
}