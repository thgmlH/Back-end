import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from 'axios'

//Component
import VideoList from './VideoList';
import Loading from "./Loading";
import Pagination from "./Pagination";

const App = ({ youtube }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [num, setNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const inputRef = React.createRef();
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [style, setStyle] = useState({display: 'block'})
  const offset = (currentPage - 1) * pageSize;
  
  const sendRequest = async() => {
    //const res = await axios.get('/api')
    //console.log('data', res.data)   
    await axios.get('/api')
    .then(res => {
      Promise.all(youtube.getdata(res.data))
        .then(array => {
          console.log(array[0], array[1], array[2], array[3])
          setData(array)
          setLoading(false)
          //setIsFetching(true)  
        })
    })
  };

  const onSet = (n) => {
    setIsFetching(false) 
    //setNum(n);
    setVideos(data[n])
  };

  useEffect(()=>{
    sendRequest();
    //handleSearch();
  }, []);  //반복 안하기 / []없으면 반복

  const handleSearch = (nowdata) => {
    const keyword = inputRef.current.value;

    let rtn = [];
    nowdata.map((d)=>{
      if(d.title.includes(keyword))
        rtn.push(d)
    })
    console.log(keyword, rtn)

    setIsFetching(false) 
    setVideos(rtn)
    setCurrentPage(1)
  };

  if (loading) {
    return (
    <>
      <Wrapper>
        <Button>
            사회참여
        </Button>
        <Button>
            생활교육
        </Button>
        <Button>
            안전지원
        </Button>
        <Button>
            일상생활 지원
        </Button>
        <Div>
        <Input type="text"/>
        <Button>검색</Button> 
        </Div>  
      </Wrapper>
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      </>
    );
  }    
  else{
    return (  
      <>
        <Wrapper>
          <Button onClick={() => {onSet(0)}}>
              사회참여
          </Button>
          <Button onClick={() => {onSet(1)}}>
              생활교육
          </Button>
          <Button onClick={() => {onSet(2)}}>
              안전지원
          </Button>
          <Button onClick={() => {onSet(3)}}>
              일상생활 지원
          </Button>
          <Div>
          <Input ref={inputRef} onFocus={() => setStyle({display: 'none'})} onBlur={() => setStyle({display: 'block'})}type="text"/>
          <Button onClick={() => {handleSearch(videos)}}>검색</Button> 
          </Div>
        </Wrapper>
        <VideoList data={isFetching ? [data[0], offset, pageSize] : [videos, offset, pageSize]}/>

        <footer style={style}>
        <Pagination
          total={isFetching ? data[0] : videos}
          pageSize={pageSize}
          current={currentPage}
          setCurrentPage={setCurrentPage}
        />
        </footer>
      </>
    );
  }

}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;


const Button = styled.button`
  borderstyle: soild;
  border-radius: 8px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0;
  background: white;
  color: black;
  font-size: 1rem;
  height: 3rem;

  &:focus {
    background-color: grey;
`;

const Div = styled.div`
  position: fixed;
  top: 0;
  right : 0;
`

const Input = styled.input`
  border-left-width:0;
　border-right-width:0;
　border-top-width:0;
　border-bottom-width:1;  
  margin: 0;
  background: white;
  color: black;
  height: 2.5rem;
  font-size: 1rem;
  outline: none;
`

export default App;
