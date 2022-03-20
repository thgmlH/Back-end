var fs = require('fs');
var request = require('request');
var async = require('async');
var https = require('https');
var ffmpeg = require('fluent-ffmpeg');
var mp3Duration = require('mp3-duration');
var mysql = require('mysql');

function update_ttsDB(queryObj){
    var headers = {
        'Authorization': '',
        'Content-Type': 'application/json'
    };
    var url;
    var status = "progress"
    
    async.waterfall([
        function(callback){ 
    
            var dataString = {
                "text": queryObj.text,
                "lang": "auto",
                "actor_id": "",
                "max_seconds": 30
             };
            
            var options = {
                url: '',
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dataString)
            };
            
            request(options, function(error, response) {
                if(error)
                    console.log("error : ", error)
                if (!error) {
                    url = JSON.parse(response.body).result.speak_url;
                    console.log(url);
                    callback(null, url);
                }
            });
        },
        function(url, callback){
            var options = {
                url: url,
                headers: headers
            };
            
            getAudioURL(status)
            
            function getAudioURL(status){
                if(status != "done"){
                    request(options, function(error, response){
                        status = JSON.parse(response.body).result.status
                        url = JSON.parse(response.body).result.audio.url
                        setTimeout(function () { getAudioURL(status) }, 2000)
                   });
                }
                else
                    callback(null, url)
            }
        },
        function(url, callback){
            var options = {
                url: '',
                headers: headers
            };
            request(options, function(error, response) {
                if(error)
                    console.log("error : ", error)
                if (!error) {
                    var result = JSON.parse(response.body).result;
                    console.log(result)
                    callback(null, result);
                }
            });
        },
        function(result, callback){
            var options = {
                url : result
            }
            request(options, function(error, response){
                if(error)
                    console.log("error : ", error)
                if (!error) {
                    callback(null, result);
                }
            })
        },
        function(result, callback){
            const file = fs.createWriteStream("tts.wav");
            var input = "tts.wav";
            var output = "tts0.mp3"
            
            https.get(result, function(response) {
                response.pipe(file);
                file.on('finish', function() {
                    console.log("Downloaded tts wav file");
                    
                    function convert(input, output, callback) {
                        ffmpeg(input)
                            .addOptions(['-ar 44100','-b:a 32k'])
                            .output(output)
                            .on('end', function() {                    
                                console.log('conversion ended');
                                callback(null);
                            }).on('error', function(err){
                                console.log('error: ' + err);
                                callback(err);
                            }).run();
                    }
                    convert(input, output, function(err){
                        if(!err) {
                            console.log('conversion complete');
                           
                            var file_name = new Date().getTime() + ".mp3";
                            fs.copyFile(output, file_name, (err) => {
                                if (err) throw err;
                                    console.log('copied to destination');
                                fs.unlink(input, (err) => err ?  console.log(err) : console.log(input, " 를 정상적으로 삭제했습니다"));
                                fs.unlink(output, (err) => err ?  console.log(err) : console.log(output, " 를 정상적으로 삭제했습니다"));
                            });
                            callback(null, file_name);
                        }
                    })    
                });
            }).on('error', function(err){
                fs.unlink(input, (err) => err ?  console.log(err) : console.log(input, " 를 삭제했습니다"))
            })
        },
        function(file_name, callback){
            var query = "";
            var id = [];

            for(var k=0; k<queryObj.di.length; k++){
                query += queryObj.di[k] + ",";
                if(k == queryObj.di.length-1)
                    query = query.slice(0, -1)
            }
            pool.query("SELECT id FROM voice WHERE file_name = '' IN (" + query + ") GROUP BY di LIMIT 0," + queryObj.di.length, null, function(err, rows, fields){
                    if (err)
                        console.log(err);
                    else{
                        for(var k=0; k<rows.length; k++){
                            id.push(rows[k].id)
                        }
                        callback(null, id, file_name);
                    }
            });
        },
        function(id, file_name, callback){
            var query = "";
            var record_time;

            mp3Duration(fs.readFileSync(file_name), function (err, duration) {
                if (err) return console.log(err.message);
                var m, s;
    
                m = parseInt((duration%3600)/60);
                s = parseInt(duration%60)

                s < 10 ? s = `0${s}`: s = `${duration}`
                m < 10 ? m = `0${m}`: m = `${m}`

                //console.log(`${m}:${s}`);
                record_time = `${m}:${s}`;

                for(var k=0; k<queryObj.doll_id.length; k++){
                    var q = "UPDATE voice SET file_name = ?, record_time = ? WHERE id = ?; "
                    query += mysql.format(q, [file_name, record_time, id[k]]);
                }

                pool.query(query, null, function(err, rows, fields){
                        if(err) console.log(err);
                        else callback(rows)
                })
            });
            

        }], function(err, response){
            if(err) console.log(err)
            else console.log(response)
        });
};


module.exports.update_ttsDB = update_ttsDB;
