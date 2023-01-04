import styled from "styled-components";
import { useMemo, useState, useEffect } from "react";

function Pagination({ total, current, setCurrentPage, isSearching }) {
  const numPages = useMemo(() => Math.ceil(total.length / 8));
  const j = useMemo(() => current % 5 === 0 ? parseInt(current / 5)-1 : parseInt(current / 5));
  const manylist = () => {
    let arr = [];
    let inc = 0;
    for (let i = 0; i < Math.ceil(numPages/5); i++) {
      arr.push(Array(numPages).fill().slice(inc, inc+5));
      inc += 5;
    }
    return arr
  }
  const list = useMemo(() => manylist())
  let [ alert, alertSet ] = useState(false);

  
  useEffect(() => {

    setTimeout(()=>{ alertSet(true) }, 1000);
  }, [])

  return (
    <>
    {isSearching ? 
      <Nav>
      {numPages === 0 ? null :
        <Button onClick={() => current === 1 ? null : setCurrentPage(current - 1)} aria-disabled={current === 1}>
	       &lt;
        </Button>}
          {alert === true  && numPages !== 0 ? 
            list[j]
            .map((_, i) => (
              <Button
                key={i + 1 + j*5}
                onClick={() => setCurrentPage(i + 1 + j*5)}
                aria-current={current === i + 1 + j*5 ? "page" : null}
              >
                {i + 1 + j*5}
              </Button>
            ))
          :
          null
          }
        {numPages === 0 ? null :
          <Button onClick={() => current === numPages ? null : setCurrentPage(current + 1)} aria-disabled={current === numPages}>
          &gt;
        </Button>}
      </Nav>
    : null}
    </>
  );
}

const Nav = styled.nav`
  position: absolute;
  display: flex;
  gap: 4px;
  bottom: -25px;
  left : 50%;
  transform : translate(-50%, -50%);
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 10px 20px 10px 20px;
  margin: 0;
  background: #ddd;
  color: black;
  font-size: 35px;
  -ms-user-select: none;
  -webkit-user-select: none;

  &[aria-disabled="true"] {
    background: #F5F5F5;
    cursor: revert;
    transform: revert;
    color: #fff;
  }

  &[aria-current] {
    background: #0ae;
    font-weight: bold;
    cursor: revert;
    transform: revert;
    color: #fff;
  }
`;

export default Pagination;
