import { useEffect, useState } from 'react';
import styled from 'styled-components';

import API from 'utils/api';
import { TAB_CURRENCY } from 'utils/currency';
import { strToNum, numAddComma } from 'utils/convert';

function TabCalc() {
  const [loading, setLoading] = useState(true);
  const [currencyToUSD, setCurrencyToUSD] = useState(null);
  const [date, setDate] = useState([]);
  const [result, setResult] = useState();

  const getDate = timestamp => {
    const d = new window.Date(timestamp * 1000);
    const dateList = [
      d.getFullYear(),
      d.toLocaleString('en-US', { month: 'short' }),
      d.getDate(),
    ];

    setDate(dateList);
  };

  const getCurrencyRate = async currency => {
    try {
      const res = await API.get(
        `live?access_key=${
          process.env.REACT_APP_CURRENCY_KEY
        }&currencies=${currency.join()}`,
      );
      setCurrencyToUSD(res.data.quotes);
      setLoading(false);
      getDate(res.data.timestamp);
    } catch (error) {
      console.error(error);
    }
  };

  const [amount, setAmount] = useState('1'); // init
  const [source, setSource] = useState(TAB_CURRENCY[0]);
  const [receive, setReceive] = useState(TAB_CURRENCY[1]);

  const currencyConverter = () => {
    const convert =
      (currencyToUSD[`USD${receive}`] / currencyToUSD[`USD${source}`]) *
      strToNum(amount);

    setResult(numAddComma(convert.toFixed(2).toString()));
  };

  const changeInput = e => {
    const { value } = e.target;
    setAmount(numAddComma(strToNum(value)));
    currencyConverter();
  };

  const changeSelect = e => {
    const { value } = e.target;
    setSource(value);
    currencyConverter();
  };

  const changeButton = e => {
    const { value } = e.target;
    setReceive(value);
    currencyConverter();
  };

  useEffect(() => {
    if (loading) {
      getCurrencyRate(TAB_CURRENCY);
    }
  }, [loading]);

  return (
    <Container>
      {loading && <div>loading</div>}
      {currencyToUSD && (
        <>
          <Input type="text" onChange={changeInput} value={amount} />
          <SelectBox onChange={changeSelect}>
            {TAB_CURRENCY.map(item => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </SelectBox>

          <Tab>
            <MenuBar>
              {Object.keys(currencyToUSD)
                .filter(item => item.slice(3) !== source)
                .map(s => (
                  <Menu key={s} value={s.slice(3)} onClick={changeButton}>
                    {s.slice(3)}
                  </Menu>
                ))}
            </MenuBar>

            <TabContents>
              <Currency>
                {receive} : {result}
              </Currency>
              <Date>
                기준일 :<br />
                {date.join('-')}
              </Date>
            </TabContents>
          </Tab>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  margin: 20px auto;
  border: 2px solid #666;
`;

const Input = styled.input``;
const SelectBox = styled.select``;
const Option = styled.option``;
const Tab = styled.div``;
const MenuBar = styled.div``;
const Menu = styled.button``;
const TabContents = styled.div``;
const Currency = styled.div``;
const Date = styled.div``;

export default TabCalc;
