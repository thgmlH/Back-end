const express=require('express');
const app=express();
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
  const scriptid = process.env.SCRIPT_ID
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
