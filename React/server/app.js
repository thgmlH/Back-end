const express=require('express');
const {LocalStorage}= require('node-localstorage')
const app=express();
const path = require('path');
var {authorize, main} = require('./main.js')

var localStorage = new LocalStorage('./scratch');
/*if (typeof window !== 'undefined') {
    console.log('You are on the browser')
    // ✅ Can use window here
  } else {
    console.log('You are on the server')
    // ⛔️ Don't use window here
  }  
//nodejs로는 window접근 안됨
]*/

//localStorage.clear();

authorize().then(main).then((data)=>{
    compare(data)
})
//const text = JSON.stringify(data)

async function store(bool, data) {
    const social=[], lifedu=[], safesupport=[], lifesupport=[]
    if(bool == false)
        localStorage.clear();

    data.map(function(array){
        if(array[0] == "사회참여")
            social.push(array[1])
        else if(array[0] == "생활교육")
            lifedu.push(array[1])
        else if(array[0] == "안전지원")
            safesupport.push(array[1])
        else if(array[0] == "일상생활 지원")
            lifesupport.push(array[1])
    })
    localStorage.setItem("text", JSON.stringify(data));
    localStorage.setItem("social", social);
    localStorage.setItem("lifedu", lifedu);
    localStorage.setItem("safesupport", safesupport);
    localStorage.setItem("lifesupport", lifesupport);
}

function confirm(){
    
    
    //localStorage.getItem('social').split(',')
    //console.log('text : ', localStorage.getItem('text'))
    //console.log('social : ', localStorage.getItem('social'))
    //console.log('lifedu : ', localStorage.getItem('lifedu'))
    //console.log('safesupport : ', localStorage.getItem('safesupport'))
    //console.log('lifesupport : ', localStorage.getItem('lifesupport')) 

    return [
        localStorage.getItem('social').split(','), 
        localStorage.getItem('lifedu').split(','), 
        localStorage.getItem('safesupport').split(','), 
        localStorage.getItem('lifesupport').split(',')
    ]
}

async function compare(data){
    const text = JSON.stringify(data)
    if(localStorage.getItem('text') == null){   //first time
        console.log('1')
        //console.log(store(true).then(confirm))
        store(true, data).then(confirm).then(call).catch(console.error)
    }
    else if(localStorage.getItem('text') != null && localStorage.getItem('text') != text){  //if it's not same
        console.log('2')
        //console.log(store(false).then(confirm))
        store(false, data).then(confirm).then(call).catch(console.error)
    }
    else if(localStorage.getItem('text') == text){  //if it's not changed
        console.log('3')
        
        const rtn = confirm()
        call(rtn)
    }
}



/*myStorage.setItem('age', 30);
myStorage.getItem('age'); // '30' (문자열)
myStorage.removeItem('age'); // null
myStorage.null

// 객체를 저장할 때
myStorage.setItem('object', JSON.stringfy({a : 'b'}));
//setItem 무조건 for문 돌려야 함 한번에 넣는 거 없음
JSON.parse(myStorage.getItem('object')); // {a : 'b'}
//로컬 스토리지 접근*/

//유튜브 썸네일 jpg주소 : 유튜브 주소 값 뒤 id를 https://img.youtube.com/vi/{id}/0.jpg
//그럼 구글 sheet에 유튜브 주소, 카테고리(분류)만 있으면 될 듯

function call(data){
    app.use(express.static(path.join(__dirname, "build")));
    app.get('/api', function (req, res) {
        //res.sendFile(path.join(__dirname, '/hello-react/src/index.js'));
        //res.send({data})
        res.send(data)
    });

    app.listen(8000, function() {console.log("Server listening on Port 8000")});
}

