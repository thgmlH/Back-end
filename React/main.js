const { database } = require('agenda/dist/agenda/database.js');
const express=require('express');
const app=express();
var data = require('./googlesheet.js')
const {google} = require('googleapis');
const script = google.script('v1');
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/script.projects',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets'
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
module.exports = { 

  authorize: async function () {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
},

/**
 * Creates a new script project, upload a file, and log the script's URL.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
 main: async function(auth){
  const script = google.script({version: 'v1', auth});
  const scriptid = "AKfycbwbilAUUJAa9wT75gBGFrreyYIkqVVZVP7_f6XQOFJObb70aY2o1ctVoqg9RLKgBGVk7A"

  //AKfycbxzG-PbQidzSCL1XUXiQQwlVXq-9c5G6FJiLAV3w6t3OdD31P0h2AF4aeEaVt0y15RF7g  - return array
  //google.options({auth: authClient});

  const res = await script.scripts.run({
    // The script ID of the script to be executed. Find the script ID on the **Project settings** page under "IDs."
    scriptId: scriptid,
    // Request body metadata
    requestBody: {
      devMode: true,
      function : "makeObject"
      // request body parameters
      // {
      //   "devMode": false,
      //   "function": "my_function",
      //   "parameters": [],
      //   "sessionState": "my_sessionState"
      // }
    },
  });
  //console.log(res.data);
  return res.data.response.result
}
}
//authorize().then(main).then(arrange).catch(console.error);
//https://script.googleapis.com/v1/scripts/AKfycbyPrFeOrSe6zITO5S3iVOq1zobmSe6Kz55dnGXRI1BqM4hEDlLVMs9b9CB4rrauw-DjTw:run
// Make a request for a user with a given ID

//const dd = authorize().then(main)
/*async function arrange(data){
  //var data = JSON.parse(data).user[0].thumbnailurl
  app.listen(8000, function() {});
  app.use(function(req, res, next) {
    res.status(404); 
    res.send(`<!doctype html>
    <html>
    <head>
      <title>TEST</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <a href="/">data</a>
      ${data}
    </body>
    </html>
  `);
  });
}*/

//여기 request넣어서 json 갖고 와서 그거 웹페이지에 띄우는 작업 -> db만들어서 그거 다 넣고, 처음만 부르고 나중엔 바뀐 데이터만 부르고(그걸 db에 또 저장하고) 갱신된거만 웹페이지에 또 반영되고
//=>좀 빨라지는 것처럼 보이게라도 되겠지 ok
//youtube 썸네일, 영상 #테그정보들 2개 api있음
//브라우저 저장소  로컬에 저장되고, 그거 불러오는 거 
//local 있는 걸 뿌리는 일은 x
//비교하는 작업만 localstorage
//local 비교 문자열 비교, if != local에 다시 set, 웹페이지에는 불러온거 뿌리기
//첫번째는 느린거고  첫번째 들어왔으면 local에 저장, 두번째부터는 비교해서 같으면 로컬서 불러오고 다르면 그대로 우선 뿌리고 그걸 저장 ㄱㄱ 이를 반복 

//module.export = {authorize, main}