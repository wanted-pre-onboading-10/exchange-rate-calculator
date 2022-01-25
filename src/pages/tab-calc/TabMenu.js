import styled from 'styled-components';
import propTypes from 'prop-types';

function TabMenu({ currencyRate, source, setReceive }) {
  const changeReceiveCurrency = e => {
    const { value } = e.target;
    setReceive(value);
  };
  return (
    <MenuBar>
      {Object.keys(currencyRate)
        .filter(item => item.slice(3) !== source)
        .map(s => (
          <Menu key={s} value={s.slice(3)} onClick={changeReceiveCurrency}>
            {s.slice(3)}
          </Menu>
        ))}
    </MenuBar>
  );
}

const MenuBar = styled.div``;
const Menu = styled.button``;

TabMenu.propTypes = {
  currencyRate: propTypes.objectOf(propTypes.number).isRequired,
  source: propTypes.string.isRequired,
  setReceive: propTypes.func.isRequired,
};

export default TabMenu;
