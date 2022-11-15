import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loading from "./Loading";
import moment from "moment";
import ReactPlayer from "react-player";

const Video = ({ index }) => {
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  console.log('index', index)
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

  return (
    <VideoItem
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {hover ? (
        <ReactPlayer
          url={"https://www.youtube.com/embed/" + index.id}
          width="100%"
          height="auto"
          playing={true}
          style={{ marginBottom: "10px" }}
        />
      ) : (
        <Thumbnail src={"https://img.youtube.com/vi/" + index.id + "/0.jpg"} />
      )}
        <Info>
            <Title>{index.title}</Title>
        </Info>
    </VideoItem>
  );
};

export default Video;

const VideoItem = styled.div`
  width: 300px;
  display: inline-block;
  padding: 8px;
  text-align: left;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  margin-bottom: 10px;
`;

const Info = styled.div``;

const Title = styled.div`
  overflow: hidden;
  white-space: normal;
  line-height: 1.2;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: black;
`;
