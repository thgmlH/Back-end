const AWS = require('aws-sdk');
var fs = require('fs');
//var async = require('async');
var mysql = require('mysql');
var request = require('request');
const parser = require('lambda-multipart-parser');
var {Observable, of, concat} = require('rxjs');
var ajax = require("rxjs/ajax");
var {map, catchError} = require('rxjs/operators');
global.XMLHttpRequest = require("xhr2");

var pool  = mysql.createPool({
    connectionLimit : 20,
    host     : '',
    user     : '',
    password : '',        
    port     : '',  
    database : ''
});

exports.handler = async (event)=>{
    
    var category = "";
    var stt_url;
    var stt = [];
    const result = await parser.parse(event);
    console.log(result);
    
    var filename = result.files[0].filename;
    console.log(result.files[0].content)

    const S3 = new AWS.S3({
        accessKeyId : "",
        secretAccessKey : ""
    });
    
    const createUploadParam = { 
        'Bucket': "bucket_name",
        'Body': result.files[0].content,
        'Key':  "/" + result.number + '/' + filename,
        'ContentType': "audio/mp3"
    }
    

    //ReactJs 사용 category에 따른 다른 구현
    //BA행동 답변처리
    const actiondb = new Observable((subscriber) => {
        
        var sentence;
        var options = {
            url: 'http://aiopen.etri.re.kr:8000/WiseNLU_spoken',
            headers: {'Content-Type':'application/json; charset=UTF-8'},
            body: JSON.stringify({
                'access_key': '',
                'argument': {
                    'text': result.text,
                    'analysis_code': "morp"
                }
            })
        }
        request.post(options, function (error, response, body) {
            if(error)
                console.log(error)
                
            console.log("got here")
            sentence = JSON.parse(body).return_object.sentence
            console.log(sentence)
            
            for(var i=0; i<sentence.length; i++){                    
                for(var j=0; j<sentence[i].morp.length; j++){
                    if(sentence[i].morp[j].type == "NNG"){
                        stt.push(sentence[i].morp[j].lemma)
                    }
                }
            }
            var query = "";

            for(var i = 0; i < stt.length; i++)
                query += stt[i] + "|"
        
            context.callbackWaitsForEmptyEventLoop = false; 
    
            pool.getConnection(function(err, conn) {
                if(!err) {      
                    //연결 성공
                    if(stt.length != 0){
                        conn.query("SELECT acategory FROM table1 WHERE action REGEXP ?", [query.slice(0, -1)], function(error, results, field){
                            console.log(results);
                            if(error){
                                return {
                                    statusCode: 200,
                                    body: JSON.stringify({
                                        result : false
                                    })
                                };
                            }
                            else if(results.length == 0)
                                category = "기타"
                            else {
                                conn.release();
                                if(results.length != 1){
                                    for(var i=0; i < results.length; i++){
                                        category += results[i].acategory + ", "
                                        if(i == results.length-1)
                                            category = category.slice(0, -2)
                                    }
                                }
                                else  
                                    category = results[0].acategory
                            }
                        });
                    }
                }
              subscriber.complete();  
            })

        })
    })
    
    //BA감정 답변처리
    const emotiondb = new Observable((subscriber) => {
        
        ajax({  //stt단어 분류
            url: `http://aiopen.etri.re.kr:8000/WiseNLU_spoken`,
            method: 'POST',
            headers: {'Content-Type':'application/json; charset=UTF-8'},
            body: JSON.stringify({
                'access_key': '',
                'argument': {
                    'text': result.text,
                    'analysis_code': "morp"
                }
            })
        })
        .pipe(
            map(res => res.response.return_object.sentence),
            catchError(error => {
                console.log('error: ', error);
                return of(error);
            }),
        ).subscribe(sentence => {
            for(var i=0; i<sentence.length; i++){                    
                for(var j=0; j<sentence[i].morp.length; j++){
                    if(sentence[i].moorp[j].type == "VA"){
                        if(j == 0)
                            stt.push(sentence[i].morp[j].lemma)
                        else 
                            stt.push(sentence[i].morp[j-1].lemma+sentence[i].morp[j].lemma)
                    }
                    else if(sentence[i].morp[j].type == "MAG" && sentence[i].morp[j].lemma == "별로")
                        stt.push(sentence[i].morp[j].lemma)
                }
            }
            
            context.callbackWaitsForEmptyEventLoop = false; 
    
            pool.getConnection(function(err, conn) {
                if(!err) {      
                    //연결 성공
                    conn.query("SELECT ecategory FROM table2 WHERE emotion LIKE ?", ["%"+stt[0]+"%"], function(error, results, field){
                        console.log(results);
                        if(error){
                            return {
                                statusCode: 200,
                                body: JSON.stringify({
                                    result : false
                                })
                            };
                        }
                        else if(results.length == 0)
                            category = "기타"
                        else {
                            conn.release();
                            category = results[0].ecategory
                        }
                    });
                }
            });
            subscriber.complete();
        })
        
    })
    
    const insertbadb = new Observable((subscriber) => {
        
        context.callbackWaitsForEmptyEventLoop = false; 
    
        pool.getConnection(function(err, conn) {
            if(err){
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        result : false
                    })
                };
            }
            else if(!err) {      
                //연결 성공
                conn.query("INSERT INTO table3(number, step, cnumber, category, stt, url, reg_date) VALUE(?, ?, ?, ?, ?, ?, now())",
                [result.number, result.step, result.cnumber, category, result.text, url], function(error, results, field){
                        console.log(results);
                        if(error){
                            return {
                                statusCode: 200,
                                body: JSON.stringify({
                                    result : false
                                })
                            };
                        }
                        else {
                            conn.release();

                            return {
                                statusCode: 200,
                                body: JSON.stringify({
                                    result : results
                                })
                            };
                        }
                });
            }
        }); 
        console.log("category : ", category, "stt : ", stt, "url : ", url)
    })
    
    try{
        const res = await S3.upload(createUploadParam).promise();
        console.log(res.Location)
        url = res.Location;
        if(result.category == 1){
            console.log(result.category)
            const baresult = concat(actiondb, insertbadb);
            console.log(baresult)
            baresult.subscribe();
        }
        else if(result.category == 2){
            const baresult = concat(emotiondb, insertbadb);
            baresult.subscribe();
        }
    }catch(error){
        return {
            statusCode: 200,
            body: JSON.stringify({
                result : false,
                error : error
            })
        };
    }
};
