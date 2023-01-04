import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import VideoPage from "./VideoPage";

const Video = ({ index }) => {
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);

  const isMobile = () => {  //모바일에선 touch event로 해야 원하는 기능들 구현이 가능한데 pc는 mouse event로 해야하기에 추가
    const user = navigator.userAgent;
    let isCheck = false;

    if ( user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1 || user.indexOf("Linux") > -1) {
        isCheck = true;
    }

    return isCheck;
  }

  const execute = () => { 
    setClick(true)
    window.open("https://www.youtube.com/watch?v=" + index.id + "?", '_blank')
  }

  const touchEnd = (e) => {
    const offsetX = e.nativeEvent.target.offsetLeft;  //특정 비디오 영역 좌측 위 꼭지점 x좌표
    const offsetY = e.nativeEvent.target.offsetTop;   //특정 비디오 영역 좌측 위 꼭지점 y좌표
    const x = e.changedTouches[0].pageX  //touchend때의 x좌표
    const y = e.changedTouches[0].pageY  //touchend때의 y좌표

    if((x <= offsetX+295 && x >= offsetX) && (y >= offsetY && y <= offsetY+270)) {
      execute();
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      //setLoading(true);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  //Modal - onRequestClose={() => setModalIsOpen(false)} -> it makes backdrop useless 
  if (!isMobile()){  //pc 웹일때
    return (
      <VideoItem>
        { click ? <VideoPage />
          : null
        }
        <Thumbnail src={"https://img.youtube.com/vi/" + index.id + "/0.jpg"} onClick={execute}/>
        <Info onClick={execute}> 
            <Title>{index.title}</Title>
        </Info>
      </VideoItem>
    );
  }
  
  return (
    <VideoItem id="video" onContextMenu={(e)=>{
      e.preventDefault();
    }}> 
      { click ? <VideoPage />
          : null
        }
      <Thumbnail src={"https://img.youtube.com/vi/" + index.id + "/0.jpg"} 
          onTouchEnd={touchEnd} 
          />
      <Info 
          onTouchEnd={touchEnd} 
          onContextMenu={(e) => {e.preventDefault();}}> 
          <Title>{index.title}</Title>
      </Info>
    </VideoItem>
  );
  
};

export default Video;

const VideoItem = styled.div`
  width: 295px;
  height : 270px;
  display: inline-block;
  padding: 0px 16px 0px 16px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  margin-bottom: 10px;
  user-drag: none;
`;

const Info = styled.div``;

const Title = styled.div`
  overflow: hidden;
  white-space: normal;
  line-height: 1.0;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: black;
  -ms-user-select:none;
  -webkit-user-select:none; 
`;
