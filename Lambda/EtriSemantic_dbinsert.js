var request = require('request');
const AWS = require('aws-sdk');
const fs = require('fs');
var async = require('async');
var mysql = require('mysql');

var pool = mysql.createPool({
                connectionLimit : 20,
                host     : '',
                user     : '',
                password : '',        
                port     : '',  
                database : ''
            });

exports.handler = function(event, context, callback){           
        const S3 = new AWS.S3({ apiVersion: '2006-03-01' });
        
        async.waterfall([
            function(callback){
                const params = {
                          Bucket: "scc-voice-file-storage",
                          Key: 'semantic.csv'
                        }
                        
                S3.getObject(params, async function(err, data){
                    //console.log(data)
                    if(!err){
                        await fs.writeFileSync("/tmp/s.csv", data.Body);
                        callback(null)
                    }
                })  
            },
            function(callback){
                var csv = fs.readFileSync('/tmp/s.csv', "utf-8")
                var arr = csv.split("\r\n")
                var result = "done"
                var query;
                var i=22;
                var stt;
                //console.log(arr)
                
                var openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU";
                var access_key = '';
                var analysisCode = "srl";
              
                etri(i);

                //재귀함수로 구현
                function etri(i){
                    stt = arr[i]
                    async.waterfall([
                        function(callback){
                            var requestJson = {
                                'access_key': access_key,
                                'argument': {
                                    'text': arr[i],
                                    'analysis_code': analysisCode
                                }
                            };
                             
                            var options = {
                                url: openApiURL,
                                body: JSON.stringify(requestJson),
                                headers: {'Content-Type':'application/json; charset=UTF-8'}
                            };
                            request.post(options, function (error, response, body) {
                                console.log(requestJson, i)
                                //console.log('responseBody = ' + body); 
                                //console.log(JSON.parse(body).return_object)
                                const srl = JSON.parse(body).return_object.sentence
                                
                                callback(null, srl)
                            });
                        },
                        function(srl, callback){
                            var row = []; 
                            var verb;
                            
                            for(var i=0; i<srl.length; i++){
                                var verbs = srl[i].SRL
                                //console.log(verbs)
                                if(verbs.length == 0 && i != srl.length-1){
                                    continue
                                }
                                else if(verbs.length == 0 && i == srl.length-1){
                                    callback(null, row)
                                }
                                else{
                                    for(var j=0; j<verbs.length; j++){
                                        console.log(verbs)
                                        var element = ["\'" + stt + "\'", "\' \'", "\' \'", "\' \'", "\' \'", "\' \'", 
                                            "\' \'", "\' \'", "\' \'", "\' \'", "\' \'", 
                                            "\' \'", "\' \'", "\' \'", "\' \'", "\' \'", 
                                            "\' \'", "\' \'", "\' \'", "\' \'"
                                            ];
                                        verb = verbs[j].verb
                                        element[1] = "\'" + verb + "\'"; 
                                        element[19] = "now()";
                                        //예외 처리 아직
                                        if(verbs[j].argument.length == 0 && j != verbs.length-1 ){
                                            console.log(verb)
                                            continue;
                                        }
                                        else if(verbs[j].argument.length == 0 && j == verbs.length-1){
                                            callback(null, row)
                                        }   
                                        else
                                        {
                                            for(var k=0; k<verbs[j].argument.length; k++){
                                                console.log('length', verbs[j].argument.length)
                                            
                                                var type = verbs[j].argument[k].type
                                                var text = verbs[j].argument[k].text
                                                
                                                switch(type){
                                                    case 'ARG0':
                                                        element[2] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARG1':
                                                        element[3] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARG2':
                                                        element[4] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARG3':
                                                        element[5] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARG4':
                                                        element[6] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-TMP':
                                                        element[7] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-LOC':
                                                        element[8] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-DIR':
                                                        element[9] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-MNR':
                                                        element[10] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-PRP':
                                                        element[11] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-CAU':
                                                        element[12] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-EXT':
                                                        element[13] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-CND':
                                                        element[14] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-PRD':
                                                        element[15] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-DIS':
                                                        element[16] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-ADV':
                                                        element[17] = "\'" + text +  "\'"
                                                        break;
                                                    case 'ARGM-NEG':
                                                        element[18] = "\'" + text +  "\'"
                                                        break;
                                                    default:
                                                        break;
                                                    }
                                                if(k == verbs[j].argument.length-1){
                                                    row.push(element)
                                                }
                                                if(k == verbs[j].argument.length-1 && j == verbs.length-1 && i == srl.length-1){
                                                    callback(null, row)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        function(row, callback){
                            console.log(row)
                            query = "";
                            if(row.length == 0)
                                callback(null, query)
                            
                            for(var i = 0; i<row.length; i++){
                                console.log(row.length)
                                query += "(";
                                for(var j=0; j<20; j++){
                                    if(j == 19){
                                        query += row[i][19] + "), "
                                        console.log(query)
                                    }
                                    else{
                                       query += row[i][j] + ", " 
                                    }
                                    
                                    if(i == row.length-1 && j == 19){
                                        query = query.slice(0, -2);
                                        console.log('query : ', query)
                                        callback(null, query)
                                    }
                                }
                            }
                        },
                        function(query, callback){
                            console.log(query)
                            if(query == "")
                                callback(null, false)
                            
                            else{
                                var options = {
                                    url: 'https://',  //다른 lambda함수 api gateway 이용 호출 => db에 insert(다른 lambda 함수에서 처리)
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({"query": query})
                                };
                                    
                                request(options, function (error, response, body) {
                                    //console.log(body)
                    
                                    if(error) console.log(error);
                                    else{
                                        //JSON.parse(body).result
                                        callback(null, body)
                                    }
                                });
                            }
                        }
                    ],
                    function(err, response){
                        if(err) console.log(err)
                        else {
                            console.log(response)
                            i = i+1;
                            if(i <= 98){
                                etri(i)
                            }
                        }
                    })
                }
            }],
            function(err, response){
                if(err) callback(null, err)
                else callback(response)
            })
};
