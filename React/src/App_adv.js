import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from 'axios'

//Component
import VideoList from './VideoList';
import Loading from "./Loading";
import Pagination from "./Pagination";
import './App.css';

const App = ({ youtube }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [checked, setChecked] = useState("social")      //checkbox
  const [text, setText] = useState('')                  //input text useRef 사용 -> value가져오기로 바꿈
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState([]);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [allowchecked, setallowChecked] = useState(true)  //checkbox


  const offset = (currentPage - 1) * pageSize;
  const offset1 = (currentPage1 - 1) * pageSize;  //검색 시와 아닐 시의 표시가 달라 하나 더 생성

  const sendRequest = async() => {

    await axios.get('/api')
    .then(res => {
      Promise.all(youtube.getdata(res.data))
        .then(array => {
          console.log(array[0], array[1], array[2], array[3])
          setData(array)
          setLoading(false)
          setVideos(array[0])  //처음 사회참여에서 검색할때 videos값 있게해줘 검색 가능해짐
        })
    })
  };

  const onSet = (n) => {
    setIsFetching(false) 
    setIsSearching(false)
    setVideos(data[n])
  };

  const changeHandler = (e, n) => {
    onSet(n); 
    setChecked(e.target.value); 
    setIsSearching(false);
    setCurrentPage(1); 
    setText(''); 
    setallowChecked(true);
  }

  useEffect(()=>{
    sendRequest();
    //handleSearch();
  }, []);  //반복 안하기 / []없으면 반복

  const handleSearch = (e) => {
    setText(e.target.value)

    if(e.target.value === ""){  //검색어가 없을 시 전에 클릭했던 카테고리, 페이지 유지
      setIsSearching(false)
      setallowChecked(true)
    }
    else if(e.target.value.replaceAll(" ", "") === ""){  //빈 문자열 검색 시 다 나오게 안하기 위함
      let rtn = [];
      setallowChecked(false)
      setIsFetching(false) 
      setIsSearching(true)
      setResult(rtn)
      setCurrentPage1(1)
    }
    else{
      let rtn = [];
      data.map((d)=>{
        d.map((dd)=>{
          if(dd.title.includes(e.target.value))
            rtn.push(dd)
        })
      })
      setallowChecked(false)
      setIsFetching(false) 
      setIsSearching(true)
      setResult(rtn)
      setCurrentPage1(1)
    }
  };

  if (loading) {
    return (
      <>
      <Wrapper className="tabmenu">
          <label>
          <input name="tab" type="checkbox" value="social" checked/>
          <em>사회참여</em>
          </label>
          <label>
          <input name="tab" type="checkbox" value="life"/>
          <em>생활교육</em>
          </label>
          <label>
          <input name="tab" type="checkbox" value="safe"/>
          <em>안전지원</em>
          </label>
          <label>
          <input name="tab" type="checkbox" value="daily"/>
          <em>일상생활 지원</em>
          </label>
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
        <Wrapper className="tabmenu">
          <label>
          <input name="tab" type="checkbox" value="social" onChange={(e) => {changeHandler(e, 0)}} checked={checked === "social" && allowchecked}/>
          <em>사회참여</em>
          </label>
          <label>
          <input name="tab" type="checkbox" value="life" onChange={(e) => {changeHandler(e, 1)}} checked={checked === "life" && allowchecked}/>
          <em>생활교육</em>
          </label>
          <label>
          <input name="tab" type="checkbox" value="safe" onChange={(e) => {changeHandler(e, 2)}} checked={checked === "safe" && allowchecked}/>
          <em>안전지원</em>
          </label>
          <label>
          <input name="tab" type="checkbox" value="daily" onChange={(e) => {changeHandler(e, 3)}} checked={checked === "daily" && allowchecked}/>
          <em>일상생활 지원</em>
          </label>
          <div className="clicksearch">
            <div>
              <div>
                <svg viewBox="0 0 12 12"> 
                  <path d="M11,9.92308 L8.04962,6.97308 C8.455,6.36385 8.69231,5.63308 8.69231,4.84615 C8.69231,2.72192 6.96962,1 4.84615,1 C2.72269,1 1,2.72192 1,4.84615 C1,6.97038 2.72231,8.69231 4.84615,8.69231 C5.63269,8.69231 6.36346,8.455 6.97269,8.05 L9.92308,11 L11,9.92308 Z M4.84615,7.15385 C3.57192,7.15385 2.53846,6.12038 2.53846,4.84615 C2.53846,3.57192 3.57231,2.53846 4.84615,2.53846 C6.12,2.53846 7.15385,3.57192 7.15385,4.84615 C7.15385,6.12038 6.12038,7.15385 4.84615,7.15385 Z">
                  </path>
                </svg>
              </div>
              <div className="inputsearch">
                <input type="text" value={text || ""} onChange={handleSearch}/>
              </div>
            </div>
          </div>
        </Wrapper>
        <span className="span">
          <VideoList data={isFetching ? [data[0], offset] : isSearching ? [result, offset1] : [videos, offset]}/>
          <Pagination
              total={isFetching ? data[0] : result}
              current={currentPage1}
              setCurrentPage={setCurrentPage1}
              isSearching={isSearching}
          />
          <Pagination
              total={isFetching ? data[0] : videos}
              current={currentPage}
              setCurrentPage={setCurrentPage}
              isSearching={!isSearching}
          />
        </span>
      </>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default App;
