const {DATA_EMAIL, DATA_PASSWORD, URL, SPREADSHEETID, AUTH} = require('./pingpong_config.js')
const webdriver = require('selenium-webdriver');
const {By, Key} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
const { file } = require('googleapis/build/src/apis/file');

const run = async () => { // 1. chromedriver 경로 설정 
    // chromedriver가 있는 경로를 입력 
        const service = new chrome.ServiceBuilder('./chromedriver_win32/chromedriver.exe').build();
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
                 await driver.findElement(By.className('tool-tip-next')).sendKeys(Key.ESCAPE);
                 console.log('popup')
                 //Key.ESCAPE
                 if(i == 2){
                    console.log('Next step')
                    //setTimeout(async ()=>{
                    const uploadBtn = await driver.findElement(By.xpath("//button[contains(text(), '대화 업로드')]"));
                    await uploadBtn.click();
                    //}, 2000)
                }
            }
            setTimeout(async () => {
                if(i == 3){
                    await driver.findElement(By.xpath(`//*[@id="modal-root"]/div/div[2]/div/div[1]/div[2]`)).click().then(console.log('Change all'))
                    
                    await driver.findElement(By.xpath(`//*[@id="modal-root"]/div/div[2]/div/div[3]/div[3]/button`)).click().then(console.log('File add'))
                    
                    await driver.findElement(By.xpath("//input[@id='pingpong-scripts']")).sendKeys('C:/Users/hyodol/Downloads/conversation.csv')

                    await driver.actions().sendKeys(Key.ESCAPE).perform().then(()=>{
                        setTimeout(async()=>{await driver.findElement(By.className('bm_bV')).sendKeys('덮어씌우기')}, 2000)
                        console.log('Changed all')
                    })
                    
                    await driver.actions().sendKeys(Key.ESCAPE).perform().then(()=>{
                        setTimeout(async()=>{await driver.findElement(By.xpath(`//*[@id="modal-root"]/div/div[2]/div/div[4]/div/button[2]`))
                                                                        .sendKeys(Key.ENTER).then(console.log("Scenario uploaded"))
                        }, 2000)
                    })
                    
                    setTimeout(async () => { await driver.quit(); process.exit(0); }, 9000); 
                }
            }, 2000)
        }, 1000)
    }
run();
