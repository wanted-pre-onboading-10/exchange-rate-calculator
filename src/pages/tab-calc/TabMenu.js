import styled from 'styled-components';
import propTypes from 'prop-types';

function TabMenu({ currencyToUSD, source, setReceive }) {
  const changeButton = e => {
    const { value } = e.target;
    setReceive(value);
  };
  return (
    <MenuBar>
      {Object.keys(currencyToUSD)
        .filter(item => item.slice(3) !== source)
        .map(s => (
          <Menu key={s} value={s.slice(3)} onClick={changeButton}>
            {s.slice(3)}
          </Menu>
        ))}
    </MenuBar>
  );
}

const MenuBar = styled.div``;
const Menu = styled.button``;

TabMenu.propTypes = {
  currencyToUSD: propTypes.objectOf.isRequired,
  source: propTypes.string.isRequired,
  setReceive: propTypes.func.isRequired,
};

export default TabMenu;
