import styled from "styled-components";
import { useMemo } from "react";

function Pagination({ total, pageSize, current, setCurrentPage }) {
  const numPages = useMemo(() => Math.ceil(total / pageSize));
  console.log('total', total, 'pageSize', pageSize, 'current', current)
  return (
    <>
      <Nav>
        <Button onClick={() => setCurrentPage(current - 1)} disabled={current === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              aria-current={current === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
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
