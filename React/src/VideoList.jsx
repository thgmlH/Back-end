import Video from "./Video";
import React from "react";
import styled from "styled-components";
import { useMemo, useState, useEffect} from "react";

const VideoList = ({data}) => {
  let listItems = useMemo(() => data[0].slice(data[1], data[1] + data[2]).map((i) => <Video key={i.id} index={i} />));  
  let [ alert, alertSet ] = useState(true);
  //const dataChange = ((data) => {
  //  setData(data)
  //})

  useEffect(() => {
    //console.log(datalist)
    //dataChange(data)
    console.log(listItems)
    console.log(data)
    let timer = setTimeout(()=>{ alertSet(false) }, 500);
  }, [])


  
  return (
    <Wrapper>
      {alert === true ? data[0].slice(data[1], data[1] + data[2]).map((i) => <Video key={i.id} index={i} />) : null}
      {listItems}
    </Wrapper>
  );

};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: absolute;
`;

export default VideoList;