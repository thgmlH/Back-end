var request = require('request');
const AWS = require('aws-sdk');
var fs = require('fs');
var async = require('async');
const clientId = '';
const clientSecret = '';
const url = `https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor`;

exports.handler = function(event, context, callback){

    const S3 = new AWS.S3({ apiVersion: '2006-03-01' });
    
    var key = event['file'];

    async.waterfall([
        function(callback){
            const params = {
              Bucket: "scc-voice-file-storage",
              Key: decodeURIComponent(key.replace(/\+/g, ' '))
            }
        
            var file = key.split('/');
            file = file[file.length-1];
            console.log(file)
            
            S3.getObject(params, function(err, data){
                console.log(data)
                if(!err){
                    fs.writeFileSync("/tmp/n.mp3", data.Body);
                    callback(null)
                }
            })   
        },
        function(callback){
            const requestConfig = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'X-NCP-APIGW-API-KEY-ID': clientId,
                    'X-NCP-APIGW-API-KEY': clientSecret
                },
                body: fs.createReadStream('/tmp/n.mp3')
            };
            request(requestConfig, (err, response, body) => {
                if (err) console.log(err);
        
                console.log(body);
                const result = JSON.parse(body).text
                callback(null, result) 
            })
        }
    ],function(err, response){
            if(err)
                callback(null, "failed");
            else
                callback(null, response);
    })
};
