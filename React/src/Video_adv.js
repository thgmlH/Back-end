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
        <Modal style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)'
          },
          content: {
            color: 'white',
            width: '100%',
            height: '100%',
            position: 'center',
            padding: 0
          }
        }} backdrop={false} isOpen={modalIsOpen} ariaHideApp={false} >
         <DIV>
            <ReactPlayer 
                url={"http://www.youtube.com/embed/" + index.id}
                width="100%"
                height="100%"
                playing={true}  
                controls={true}
            />
            <Close role="button" onClick={() => {setModalIsOpen(false)}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{fill: "#0ae"}}>
                <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                </svg>
            </Close>
          </DIV>
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

const DIV = styled.div`
  width: 100%;
  height: 90%;
  padding-top: 40px;
  left: 0;
`

const VideoItem = styled.div`
  width: 250px;
  display: inline-block;
  padding: 10px 37px 10px ;
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

const Close = styled.div `
  position: absolute;
  border: none;
  right: 0;
  top: 0;
  width : 40px;
  height : 40px;
  border-radius: 8px;
}`
