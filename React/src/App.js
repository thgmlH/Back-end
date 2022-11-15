import React, {useEffect, useState} from 'react';
import ReactPlayer from 'react-player'
import styled from "styled-components";
import Page from './Page'
//Component
import axios from 'axios'
import VideoList from './VideoList';
//import Counter from './Counter0';
//import MyName from './MyName';
//import logo from './logo.svg';
//import './App.css';

const VideoItem = styled.div`
  width: 300px;
  display: inline-block;
  padding: 8px;
  text-align: left;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
`;


const App = ({ youtube }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [player, setPlayer] = useState({video: '', title: '', description: ''});
  const [isPlayerOpened, setIsPlayerOpened] = useState(false);
  const [thumbnail, setThumbnails] = useState("");
  const [url, setURL] = useState("")
  const [hover, setHover] = useState(false);

  //googlesheet가져오기
  //서버는 그것만, 프론트에서 youtube썸네일, 제목 띄우기
  
  const sendRequest = async() => {
    //const res = await axios.get('/api')
    //console.log('data', res.data)    
    await axios.get('/api')
    .then(res => {
      Promise.all(youtube.search(res.data))
        .then(data => {
          console.log("Done", data[0][0])
          setData(data[0][0])
          setIsFetching(true)  
        })
    })
  };

  useEffect(()=>{
    sendRequest();    
  }, []);  //반복 안하기 / []없으면 반복

  /*const handleSearch = useCallback((keyword) => {
    Promise.all(
      youtube.search(keyword)
      .then(data => {
        setItems(data)
        //setURL(process.env.REACT_APP_URL + keyword)
        //setThumbnails(process.env.REACT_APP_IMG + keyword + "/0.jpg")
      }))
  }, []);*/

  return (
    <>
      <VideoList data={isFetching ? data : []}/>
    </>
  );

}

export default App;

/*[
  {id: 'GlkNtj1HCWg', title: '[2021 청춘문화 노리터] 4월 체험프로그램 ‘마술 체험, 상상 배움터’'},
  {id: 'F2l5ibeZt1E', title: '[2021 청춘문화 노리터] 5월 체험프로그램 ‘제로웨이스트 일상나눔터’'},
  {id: 'YUENAChzY-s', title: '[2021 청춘문화 노리터] 6월 월간프로그램 ‘랜선 궁 투어 예부터’ 경복궁'},
  {id: '2_LPDSA1kdI', title: '[2021 청춘문화 노리터] 6월 월간프로그램 ‘랜선 궁 투어 예부터’ 덕수궁'},
  {id: 'CCrE1Gr0qs8', title: '[2021 청춘문화 노리터] 6월 월간프로그램 ‘랜선 궁 투어 예부터’ 창경궁'},
  {id: 'AFMTfuHaiC4', title: '[2021 청춘문화 노리터] 6월 월간프로그램 ‘랜선 궁 투어 예부터’  창덕궁'},
  {id: 'f254VYLEVfQ', title: '[2022 청춘문화 노리터] 알록달록 민화노리터 2회차 : 민화 컬러링 배우기'},
  {id: 'aa0ruxMAF6I', title: '[2022 청춘문화 노리터] 알록달록 민화노리터 1회차 : 색연필 기법 연습하기'},
  {id: 'Qk_MG7rHXP8', title: '[2022 청춘문화 노리터] 책에 담는 나의 인생 삶이야기터 1회차'},
  {id: 'VlD4g1eBnf4', title: '[2022 청춘문화 노리터] 책에 담는 나의 인생 삶이야기터 2회차'}
]*/

/*return (
    <>
      <Page onSearch={handleSearch} />
      <VideoItem
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          >
          {hover ? (
            <ReactPlayer
              url={url}
              width="auto"
              height="auto"
              playing={true}
              style={{ marginBottom: "10px" }}
            />
          ) : (
            <Thumbnail src={thumbnail} />
          )}
        {items}
      </VideoItem>
    </>
  );
}




const App = () => {
  const data = "";
  const sendRequest = async() => {
    const res = await axios.get('/api')

    console.log(res.data)
    data = res.data[0]
    
  };

  useEffect(()=>{
    sendRequest();    
  });

  return (
    <div className="App">
      {data}
    </div>
  );
}

/*class App extends Component{
  render(){  //returning JSX
    const name='react';
    const style = {
      backgroundColor: 'black',
      padding: '16px',
      color: 'white',
      fontSize: '12px'
    };
    return (
      <div style={style}>
        hello!
      </div>
    );
    //return (
    //  <MyName name="홍소희" />
    //);

    //return (
    //  <Main />
    //)
  }
}

export default App;*/
