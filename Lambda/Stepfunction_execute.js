const AWS = require('aws-sdk');
var request = require('request');
var async = require('async');

const stepFunctions = new AWS.StepFunctions();

exports.handler = function(event, context, callback) {
    const S3 = new AWS.S3({ apiVersion: '2006-03-01' });

    const bucket = event.Records[0].s3.bucket.name
    const key = event.Records[0].s3.object.key
  
    const params = {
        stateMachineArn: "arn",
        input: "{\"bucket\" : \"" + bucket + "\", \"key\" : \"" + key + "\"}"
    };
    async.waterfall([
        function(callback){
            stepFunctions.startExecution(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else{
                    console.log(data);           // successful response   
                    setTimeout(function() {callback(null, data.executionArn)}, 10000)
                }
            });
        },
        function(exe, callback){
            var param = {
                executionArn : exe
            }
            var output;
            var status, dt;
            
            output()
            function output(){
                stepFunctions.describeExecution(param, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else{
                        console.log(data); 
                        // successful response
                        status = data.status
                        if(status !=  "SUCCEEDED"){
                            return output()
                        }
                        else if(status == "SUCCEEDED") {
                            output = data.output
                            if(output)
                                callback(null, output)
                        }
                    }
                    
                });
            }
        }
    ],function(err, response){
        if(err)
            callback(null, err);
        else
            callback(null, response);
    })

};
