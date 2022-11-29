import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import ReactPlayer from "react-player";
//import Playvideo from "./Playvideo";
import Modal from 'react-modal';

const Video = ({ index }) => {
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);
  const [mouse, setMouse] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  return (
    <VideoItem>
      {click ? (
        <Modal backdrop={false} isOpen={modalIsOpen} ariaHideApp={false} > 
            <ReactPlayer 
                url={"http://www.youtube.com/embed/" + index.id}
                width="95%"
                height="95vh"
                playing={true}
                style={{
                    position: 'absolute',
                    top: 35,
                    left: 30
                }}
            />
            <Close onClick={() => {setModalIsOpen(false)}}>X</Close>
        </Modal>
      ) : (null)
      }
      <Thumbnail src={"https://img.youtube.com/vi/" + index.id + "/0.jpg"} onClick={() => {setClick(true); setModalIsOpen(true);}} />
      <Info>
          <Title>{index.title}</Title>
      </Info>
    </VideoItem>
  );
};

export default Video;

const VideoItem = styled.div`
  width: 250px;
  display: inline-block;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 110%;
  margin-bottom: 10px;
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
`;

const Close = styled.button `
    position: absolute;
    right: 10px;
    top: 10px;
  }`