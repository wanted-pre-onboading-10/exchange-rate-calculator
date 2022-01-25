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

const MenuBar = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.button`
  padding: 5px;
  margin-top: 10px;
  width: 45px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #f1f2f3;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

TabMenu.propTypes = {
  currencyRate: propTypes.objectOf(propTypes.number).isRequired,
  source: propTypes.string.isRequired,
  setReceive: propTypes.func.isRequired,
};

export default TabMenu;
