import styled from 'styled-components';
import propTypes from 'prop-types';
import { TAB_CURRENCY } from 'utils/currency';
import { numAddComma, strToNum } from 'utils/convert';

function InputBox({ amount, setAmount, setReceive, setSource, getRate }) {
  const updateAmount = e => {
    const { value } = e.target;
    setAmount(numAddComma(strToNum(value)));
    getRate();
  };

  const changeSourceCurrency = e => {
    const { value } = e.target;
    if (value !== TAB_CURRENCY[0]) setReceive(TAB_CURRENCY[0]);
    else setReceive(TAB_CURRENCY[1]); // 앞으로 초기화
    setSource(value);
    getRate();
  };

  return (
    <Container>
      <Input
        type="text"
        onChange={updateAmount}
        value={amount}
        maxLength={15}
      />
      <SelectBox onChange={changeSourceCurrency}>
        {TAB_CURRENCY.map(item => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </SelectBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  width: 250px;
`;

const Input = styled.input`
  display: block;
  padding: 5px 0px 5px 10px;
  margin-right: 5px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border: 1px solid #000;
    outline: none;
  }
`;
const SelectBox = styled.select``;

const Option = styled.option``;

InputBox.propTypes = {
  amount: propTypes.string.isRequired,
  setAmount: propTypes.func.isRequired,
  setReceive: propTypes.func.isRequired,
  setSource: propTypes.func.isRequired,
  getRate: propTypes.func.isRequired,
};

export default InputBox;
