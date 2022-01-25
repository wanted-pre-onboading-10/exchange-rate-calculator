import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Navigation() {
  return (
    <StyledNav>
      <Link to="/simple">Simple Calculator</Link>
      <Link to="/tab">Tab Calculator</Link>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-bottom: solid 1px #333;
  font-size: 20px;
  color: #333;

  & > * + * {
    margin-left: 20px;
  }
`;

export default Navigation;
