import Video from "./Video";
import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Loading from "./Loading";

const VideoList = ({data}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listItems, setList] = useState(null);
  //console.log('...', data[0], data[1], data[2], data[3])
  
  useEffect(() => {
    //const fetchData = async () => {
    //  setLoading(true);
    // setVideos(data)
      if(data){
        console.log('videos', data)
        setLoading(false);

        setList(data.map((i) => <Video index={i} />));
      }
    //}
    //fetchData();
  });

  if (loading) {
    return (
      <Wrapper>
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
      </Wrapper>
    );
  }

  if (!videos) {
    return (
      <div>
        사이트설정(url창의 자물쇠)-안전하지 않은 콘텐츠-허용 으로 바꿔주세요!
      </div>
    );
  }

/*
{videos.map((_, k)=>
  {videos[k].map((_, i) => 
    {videos[k][i].map((j)=>{
        return <Video index={j} />
    })
    }
  )}
)}

{data.map((k)=>
        <Video index={k} />
      )}
*/

  return (
    <Wrapper>
      {listItems}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default VideoList;