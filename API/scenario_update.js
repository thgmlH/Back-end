const fs = require('fs')
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const {DATA_EMAIL, DATA_PASSWORD, URL, SPREADSHEETID, AUTH} = require('./config.js')
const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');

//-------Get data from googlesheet and update in specific web page-------//

var rows = [];
async function main () {
    const authClient = await authorize();
    const request = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: SPREADSHEETID,  // TODO: Update placeholder value.

        // The A1 notation of the values to retrieve.
        ranges: 'sheet_name!C1:G',
        // TODO: Update placeholder value.

        majorDimension : 'ROWS',

        auth: authClient,
    };

    try {
        const response = (await sheets.spreadsheets.values.batchGet(request)).data;
        // TODO: Change code below to process the `response` object:
        console.log(response.valueRanges[0].values)
        rows.push(response.valueRanges[0].values)
    } catch (err) {
        console.error(err);
    }
    if(rows.length != 0){
        printrows();
        createcsv();
    }
}
//main();

async function authorize() {

  let authClient = AUTH;

  if (authClient == null) {
    throw Error('authentication failed');
  }

  return authClient;
}

async function printrows(){
    console.log("rows", rows)
}

async function createcsv(){

    let data

    data = rows[0].map((row) => row.join(',')).join('\r\n')
    
    fs.writeFileSync('./scenario.csv', "\uFEFF" + data)

    run();

}

const run = async () => { // 1. chromedriver 경로 설정 
    // chromedriver가 있는 경로를 입력 
        const service = new chrome.ServiceBuilder('./chromedriver_linux64/chromedriver').build();
        chrome.setDefaultService(service); // 2. chrome 브라우저 빌드 
        const driver = await new webdriver.Builder() .forBrowser('chrome').build(); // 3. google 사이트 열기 

        await driver.get('https://builder.pingpong.us/login'); // 4. 3초 후에 브라우저 종료 

        //const loginemail = await driver.findElement(By.name('email')); 
        await driver.findElement(By.name('email')).sendKeys(DATA_EMAIL)

        //const loginpwd = await driver.findElement(By.name('password')); 
        await driver.findElement(By.name('password')).sendKeys(DATA_PASSWORD)

        //const loginBtn = await driver.findElement(By.className('gw_gy'));main
        await driver.findElement(By.className('gw_gy')).click();

        await driver.get(URL)
        console.log("First step")
        
        setTimeout(async () => {
            for(i=0; i<3; i++){
                 await driver.findElement(By.className('tool-tip-next')).click()
                 if(i == 2){
                    const upload = await driver.findElement(By.xpath("//button[contains(text(), '대화 업로드')]"))
		                await upload.click();

                    await driver.findElement(By.xpath("//button[contains(text(), '파일 추가')]")).click()
    
                    await driver.findElement(By.xpath("//input[@id='pingpong-scripts']")).sendKeys('/home/ubuntu/scenario_api/scenario.csv').then(console.log("File added"))
            
                    await driver.findElement(By.xpath(`//*[@id="modal-root"]/div/div[2]/div/div[4]/div/button[2]`)).click().then(console.log("Scenario uploaded"))
            
                    setTimeout(async () => { await driver.quit(); process.exit(0); }, 7000); 
                  }
              }
        }, 1000)
    }


module.exports.main = main
