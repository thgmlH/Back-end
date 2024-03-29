import React, { Component, memo } from 'react';
import styled from "styled-components";
import LoadImage from "./loading.png";

const Loading = () => {
    return (
      <VideoItem>
        <Thumbnail src={LoadImage} />
        <Profile src={LoadImage} />
        <Info>
          <Title />
          <Chanel />
        </Info>
      </VideoItem>
    );
  };
  
  export default Loading;
  
const VideoItem = styled.div`
  width: 300px;
  display: inline-block;
  padding: 15px;
  text-align: left;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
`;

const Profile = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  float: left;
  margin: 0 1vw 10vh 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  display: flex;
  width: 90%;
  height: 30px;
  background-color: #cccccc;
`;

const Chanel = styled.div`
  display: flex;
  width: 80%;
  height: 20px;
  background-color: #cccccc;
`;