var AWS = require('aws-sdk');

exports.handler = function(event, context, callback){
  
    var comprehend = new AWS.Comprehend({
            apiVersion: '2017-11-27',
            region: "ap-northeast-2"
        });
    var params = {
            LanguageCode: 'ko',
            Text: event['text']
    }

    comprehend.detectSentiment(params, function(err, data){

        if(err) console.log(err, err.stack);
        else console.log(data.SentimentScore);
    });
    
  /*Detect entities
    var detectentities = {
       LanguageCode: 'ko',
       Text: event['text']
     }
     comprehend.detectEntities(detectentities, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);           // successful response
         return callback(null, data)
     });
  */
  
  /*Detect key phrase
    var detectkeyphrase = {
      LanguageCode: 'ko',
      Text: event['text']
    };
  
    comprehend.detectKeyPhrases(detectkeyphrase, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data.KeyPhrases[0]);           // successful response
      return callback(null, data.KeyPhrases)
    });
  */
};
