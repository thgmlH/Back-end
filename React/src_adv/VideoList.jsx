import Video from "./Video";
import React from "react";
import styled from "styled-components";
import { useMemo, useState, useEffect} from "react";

const VideoList = ({data}) => {
  let listItems = useMemo(() => data[0].slice(data[1], data[1] + 8).map((i) => <Video key={i.id} index={i} />));  
  let [ alert, alertSet ] = useState(true);

  useEffect(() => {
    //console.log(listItems)
    //console.log(data)
    setTimeout(()=>{ alertSet(false) }, 1000);
  }, [])
  
  return (
    <Wrapper>
      {alert === true ? data[0].slice(data[1], data[1] + 8).map((i) => <Video key={i.id} index={i} />) : null}
      {listItems}
    </Wrapper>
  );

};

const Wrapper = styled.div`
  height : 545px;  
  padding : 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: absolute;
`;

export default VideoList;