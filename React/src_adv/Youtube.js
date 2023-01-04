import axios from 'axios'

class Youtube {

    constructor(key) {
        //this.key = key;
        this.reqOptions = {
          method: 'GET',
          redirect: 'follow',
          params : {
            part : 'snippet',
            fields : 'items(id,snippet(title))',
            key : key,
          }
        };
    }

    getdata(keyword) {  //배열로 저장후 뿌림
      const data = new Array(keyword.length);
      //const data = [[], [], [], []];
      console.log('Got data', keyword)
      const reqOptions = this.reqOptions

      /*function getinfo(id){
          return axios(
            //`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword[i][j]}&type=video&key=${this.key}`, //할당량 - 100
            `https://www.googleapis.com/youtube/v3/videos?id=${id}`,  //할당량 - 1
            reqOptions
          )
          .then((response) => {
            return response.data
          })
          .then((responseJson) => {
            const items = responseJson['items'].map(item => {
              return {
                id : item.id,
                title : item.snippet.title
              }
            });
            console.log('items', items)
            return items;
          })
      }*/

      keyword.map((_, i) => {
        keyword[i] = keyword[i].sort()
      })

      for(let i=0; i<keyword.length; i++){

        if(keyword[i].length > 50){
          console.log('more')
          data[i] = [];
          const len = keyword[i].length;
          const cnt = Math.ceil(len / 50);
          let offset = 0;
          let j = 0;

          loop(j);

          async function loop(j){  //for (let j = 0; j < cnt; j++) {
            
            const tmp = keyword[i].slice(offset + 50*j, 50 + 50*j)
            const id = tmp.join(',');
            await axios(
              //`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword[i][j]}&type=video&key=${this.key}`, //할당량 - 100
              `https://www.googleapis.com/youtube/v3/videos?id=${id}`,  //할당량 - 1
              reqOptions
            )
            .then((response) => {
              return response.data
            })
            .then((responseJson) => {
              const items = responseJson['items'].map(item => {
                return {
                  id : item.id,
                  title : item.snippet.title
                }
              })
              data[i].push(...items);

              if(data[i].length == 50*(j+1) && j < cnt){
                j = j + 1
                loop(j);
              }
            })
          }
        }
        else{
          console.log('less')  
          data[i] = [];
          const id = keyword[i].join(',')
          axios(
            //`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword[i][j]}&type=video&key=${this.key}`, //할당량 - 100
            `https://www.googleapis.com/youtube/v3/videos?id=${id}`,  //할당량 - 1
            reqOptions
          )
          .then((response) => {
            return response.data
          })
          .then((responseJson) => {
            const items = responseJson['items'].map(item => {
              return {
                id : item.id,
                title : item.snippet.title
              }
            });
            data[i].push(...items)
          })
        }
      }
      
      return data
    }

}

export default Youtube;