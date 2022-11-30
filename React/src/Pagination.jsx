import styled from "styled-components";
import { useMemo, useState, useEffect } from "react";

function Pagination({ total, pageSize, current, setCurrentPage }) {
  const numPages = useMemo(() => Math.ceil(total.length / pageSize));
  let [ alert, alertSet ] = useState(false);
  console.log('total', total, 'pageSize', pageSize, 'current', current)

  useEffect(() => {
    setTimeout(()=>{ alertSet(true) }, 500);
  }, [])

  return (
    <>
      <Nav>
        <Button onClick={() => setCurrentPage(current - 1)} disabled={current === 1}>
          &lt;
        </Button>
        {alert === true ? Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              aria-current={current === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          )) : null}
        <Button onClick={() => setCurrentPage(current + 1)} disabled={current === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  position: fixed;
  display: flex;
  gap: 4px;
  margin: 16px;
  bottom: 0;
  left : 50%;
  transform : translate(-50%, -50%)
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 15px;
  margin: 0;
  background: white;
  color: black;
  font-size: 1rem;

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: grey;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
