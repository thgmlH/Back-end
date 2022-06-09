const AWS = require('aws-sdk');
var fs = require('fs');
const {google} = require('googleapis');
const sheets = google.sheets('v4');
var request = require('request');
var async = require('async');

var rows = [];

async function googleapi(){
    var rtn;
    const authClient = await authorize();
    const option = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: "",  // TODO: Update placeholder value.

        // The A1 notation of the values to retrieve.
        ranges: 'sheet_name!C1:G', 
        // TODO: Update placeholder value.

        majorDimension : 'ROWS',

        auth: authClient,
    };

    try {
        const response = (await sheets.spreadsheets.values.batchGet(option)).data;
        // TODO: Change code below to process the `response` object:
        //console.log(response.valueRanges[0].values)
        rows.push(response.valueRanges[0].values)
    } catch (err) {
        console.error(err);
    }
    if(rows.length != 0){
        let data
                
        data = rows[0].map((row) => row.join(',')).join('\r\n')
    
        //fs.writeFileSync('scenario.csv', "\uFEFF" + data)
        
        await fs.writeFileSync('/tmp/scenario.csv', "\uFEFF" + data)
    }
}

exports.handler = function(event, context, callback){
    
    async.waterfall([
        function(callback){
            googleapi().then(()=>{
                if(fs.createReadStream('/tmp/scenario.csv')){
                    console.log('Got googlesheet scenario csv');
                    callback(null)
                } 
            })
            
        },
        function (callback){
            const S3 = new AWS.S3({
                accessKeyId : "",
                secretAccessKey : ""
            });
            const createUploadParam = { 
                'Bucket': "bucket_name",
                'Body': fs.createReadStream('/tmp/scenario.csv'),
                'Key':  'scenario.csv',
                'ContentType': "text/csv"
            }
                    
            S3.upload(createUploadParam, function (err, data) {
    
                if (err) {
                  console.log("Error", err);
                } 
                if (data) {
                    console.log("Upload Success", data.Location);
                    fs.createReadStream('/tmp/scenario.csv').destroy();
                    callback(null)
                }
                else if(!data){
                    console.log("Not yet")
                }
            })
        },
        function (callback){
            var options = {
                url: 'https://(lambda_api_url)',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
                
            request(options, function (error, response, body) {
                //console.log(body)

                if(error) console.log(error);
                else{
                    //JSON.parse(body).result
                    callback(null, JSON.parse(body).result)
                }
            });
        }
    ], 
    function(err, response){
        if(err) callback(null, err) //err
        else{
            console.log(response)
            callback(null, response) //response
        }
    })
}

async function authorize() {

  let authClient = "";

  if (authClient == null) {
    throw Error('authentication failed');
  }

  return authClient;
}


