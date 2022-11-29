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

      for(let i=0; i<keyword.length; i++){
        
        if(keyword[i].length > 50){
            console.log('more')
            data[i] = [];
            const len = keyword[i].length;
            var cnt = Math.floor(len / 50);

            for (let j = 0; j <= cnt; j++) {
                const tmp = keyword[i].splice(0, 50)
                const id = tmp.join(',');
                
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
                  //console.log('tmparr', tmparr)
                })
                
            }
            //data[i].push(tmparr)
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



    /*setThumbnails(items, promises) {
        for (let i=0; i<items.length; i++) {
            promises.push(
              fetch(`"https://img.youtube.com/vi/${id}/0.jpg`)
              .then(response => response.json())
              .then(responseJson => responseJson['items'][0].snippet.thumbnails.default.url)
              .then(url => {
                items[i].channelThumbnails  = url;
              })
            );
          }
          return promises;
    }*/

    /*search(keyword){  //뭘로 검색?
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
}

export default Youtube;