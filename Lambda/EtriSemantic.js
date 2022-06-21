var request = require('request');

exports.handler = function(event, context, callback){           
        //형태소 분석 기술(구어)
        var openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU";
        var access_key = '';
        var analysisCode = "srl";
        var text = event['text'];

        var requestJson = {
            'access_key': access_key,
            'argument': {
                'text': event['text'],
                'analysis_code': analysisCode
            }
        };
         
        var request = require('request');
        var options = {
            url: openApiURL,
            body: JSON.stringify(requestJson),
            headers: {'Content-Type':'application/json; charset=UTF-8'}
        };
        request.post(options, function (error, response, body) {
            console.log('responseBody = ' + body); 
            const srl = JSON.parse(body).return_object.sentence[0].SRL

            return callback(null, srl);
            //console.log(sentence.length)
        });
};
