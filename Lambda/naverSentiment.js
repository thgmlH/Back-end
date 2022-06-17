var request = require('request');
var mysql = require('mysql');

exports.handler = function(event, context, callback){
    
        var options = {
            url: 'https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze',
            method: 'POST',
            headers: {
                'X-NCP-APIGW-API-KEY-ID': '',
                'X-NCP-APIGW-API-KEY': '',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                "content": event['content']
              })
        };
        request(options, function (error, response, body) {
        	  if (!error && response.statusCode == 200) {
        	        console.log(body)
        	        console.log(JSON.parse(body).document.confidence)
        	        return callback(null, JSON.parse(body));
        	  }
        });
};
