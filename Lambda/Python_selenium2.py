from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import boto3
import botocore


print('Loading function')


def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))
    #print("value1 = " + event['key1'])
    #print("value2 = " + event['key2'])
    #print("value3 = " + event['key3'])
    #return event['key1']  # Echo back the first key value
    #raise Exception('Something went wrong')


    BUCKET_NAME = 'scc-voice-file-storage' # replace with your bucket name
    KEY = 'conversation.csv' # replace with your object key
    
    s3 = boto3.resource('s3')
    
    try:
        s3.Bucket(BUCKET_NAME).download_file(KEY, '/tmp/pingpong.csv')
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("The object does not exist.")
        else:
            raise
    
    options = Options()
    options.binary_location = '/opt/headless-chromium'
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--single-process')
    options.add_argument('--disable-dev-shm-usage')

    driver = webdriver.Chrome('/opt/chromedriver', chrome_options=options)
    driver.get('https://builder.pingpong.us/login')
    
    driver.find_element_by_name('email').send_keys("")
    driver.find_element_by_name('password').send_keys('')

    #driver.implictly_wait(3)
    wait = WebDriverWait(driver, 10)
    element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'gw_gy')))
    #driver.find_element_by_name('gw_gy').send_keys(Keys.ENTER)
    element.send_keys(Keys.ENTER)
    print('Login')

    for i in range(0, 3):
        element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'tool-tip-next')))
        element.send_keys(Keys.ESCAPE)
        if i == 2 :
            element = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '대화 업로드')]")))
            element.send_keys(Keys.ENTER)
            print('Scenario upload button')
            i = i+1
            
    print(i)
    if i == 3 :
        #element = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '파일 추가')]")))
        #element.send_keys(Keys.ENTER)

        #driver.find_element_by_xpath("//button[contains(text(), '파일 추가')]").send_keys(Keys.ENTER)
        driver.find_element_by_xpath('//*[@id="modal-root"]/div/div[2]/div/div[1]/div[2]').click()  #덮어씌우기

        driver.find_element_by_xpath("//*[@id='modal-root']/div/div[2]/div/div[3]/div[3]/button").send_keys(Keys.ENTER) #파일 추가

        
        driver.find_element_by_xpath("//input[@id='pingpong-scripts']").send_keys('/tmp/pingpong.csv')
        print('File added')

        textbox = driver.find_element_by_xpath('//*[@id="modal-root"]/div/div[2]/div/div[3]/div[4]').is_displayed()
        print('Display', textbox)

        if textbox == True:

            driver.find_element_by_xpath('//*[@id="modal-root"]/div/div[2]/div/div[3]/div[4]/input').send_keys('덮어씌우기')

            driver.find_element_by_xpath('//*[@id="modal-root"]/div/div[2]/div/div[4]/div/button[2]').send_keys(Keys.ENTER)
            
            print('Uploaded scenario')
            driver.close();
            driver.quit();
            
            return {'result' : 'Uploaded'}

        elif textbox == False:

            error = driver.find_element_by_xpath('//*[@id="modal-root"]/div/div[2]/div/div[3]/div[5]/div[2]/div')
            errortext = error.text
            
            driver.close();
            driver.quit();
            
            return {'result' : errortext}
    
    
