const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
var sleep = require('sleep'); 

var fs = require('fs'); 

let objArray = [];
let departmentArray = [];

(async function example() {
  let driver = new webdriver.Builder().forBrowser('firefox').build();

  await driver.get('https://m.albert.nyu.edu/app/catalog/classSearch/1204')

  const college = await driver.findElement(By.id("search-acad-group"));
  college.sendKeys("c","c","c");

  sleep.sleep(1);

  const departmentName = await driver.findElement(By.name("subject")).getText();
  parseDepartments(departmentName);

  for(var j = 1; j < departmentArray.length; j++)
  {
    // Change departments
    const department = await driver.findElement(By.name("subject"));
    department.sendKeys(Key.ARROW_DOWN);

    sleep.sleep(6);

    await driver.findElement(By.id("buttonSearch")).click();

    //Prepare new department
    var objDepartment = {
      name: departmentArray[j],
      yearId: 1204,
      classIds: []
    }

    sleep.sleep(6);

    let results = await driver.findElement(By.id("search-results"));
    results = await driver.findElements(By.className("section-content"))

    sleep.sleep(2);
    
    let text = "";
    for(var i = 2; i < results.length; i++)
    {
        text = await results[i].getText();
        objDepartment.classIds = parseData(objDepartment.classIds, text);
    }

    objArray.push(objDepartment);
    
    sleep.sleep(1);
  }

  // console.log(objArray);

  fs.writeFile("CAS.json", JSON.stringify(objArray, null, 2), function(err) {

    if(err) {
        return console.log(err);
    }

    console.log("The file is written");
  }); 

  driver.quit();
  
})();

function parseDepartments(strData)
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