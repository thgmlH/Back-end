const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const AWS = require('aws-sdk');
var async = require('async');
var mysql = require('mysql')

var pool = mysql.createPool({
                connectionLimit : 20,
                host     : '',
                user     : '',
                password : '',        
                port     : '',  
                database : ''
            });

exports.handler = function(event, context, callback){
        
        const invokeurl = ''
        const secretkey = ''
        
        //const S3 = new AWS.S3({ apiVersion: '2006-03-01' });
        const S3 = new AWS.S3({
                        accessKeyId : "",
                        secretAccessKey : ""
                    });

        var stt = [];
        var arr = [];
        var i = 0;
        
        var csv = [];
        
        var params = {
                Bucket: 'bucket_name',
                Delimiter: '/',
                Prefix: event['directory'] + '/'
            };
            
        S3.listObjects(params, function(err, data) {
          if (err) {
            return 'There was an error viewing your album: ' + err.message
          } else {
            console.log(data.Contents,"<<<all content");
            data.Contents.forEach(function(obj,index) {
                
                arr.push(obj.Key.split('/')[2])
                if(arr.length == data.Contents.length)
                    work(arr.length-1)
            })
          }
        })

        function work(i){
            async.waterfall([
                function(callback){
                    const params = {
                          Bucket: 'bucket_name',
                          Key: '/' + event['directory'] + '/' + arr[i]
                    }

                    S3.getObject(params, async function(err, data){
                        //console.log(data)
                        if(!err){
                            await fs.writeFileSync("/tmp/ex.mp3", data.Body);
                            callback(null)
                        }
                    })   
                },
                function(callback){
                    
                    const getinfo = function(){
                        return new Promise(resolve=>{
                            var rtn = [];
                            pool.getConnection(function(err, conn) {
                                if(!err) {
                                //연결 성공
                                    conn.query("SELECT name, date FROM table_name WHERE url LIKE ?", ["%/" + event['directory'] + '/' + arr[i]], function(error, results, field){
                                                console.log(results);
                                                rtn.push([results[0].name, results[0].date])
                                                resolve(rtn)
                                    });
                                }
                            });
                        })
                    }
    
                    const speech = function(){
                        return new Promise(resolve => {
                            var context;
                            const form = new FormData();
            
                            form.append('media', fs.createReadStream("/tmp/ex.mp3"));
                            form.append('params', '');
                            
                            axios.post(
                                invokeurl + '/recognizer/upload',
                                form,
                                {
                                    headers: {
                                        ...form.getHeaders(),
                                    }
                                }       
                            ).then(async function(response){ 
                            	console.log(response.data.text)
                            	context = response.data.text 
                            	resolve(context)
                            })
                            .catch(error => {
                                console.log('error', error)
                            });
                        })
                    }

                    Promise.race([
                      getinfo().then((rtn) => console.log(rtn)),
                      speech().then((context) => console.log(context))
                    ]).then(() => {callback(null, 'done')})
                    
                }],function(err, response){
                        if(err) console.log('err', err)
                        else{
                            i= 3
                            callback(null, response)
                        }
                })
        }
        if(i == arr.length-1)
            callback(null, 'done '+ i)
};
