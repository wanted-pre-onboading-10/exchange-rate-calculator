import { useEffect, useState } from 'react';
import styled from 'styled-components';

import API from 'utils/api';
import { TAB_CURRENCY } from 'utils/currency';
import { strToNum, numAddComma } from 'utils/convert';
import CurrencyConverter from 'components/converter';

function TabCalc() {
  const [loading, setLoading] = useState(true);
  const [currencyToUSD, setCurrencyToUSD] = useState(null);
  const [date, setDate] = useState([]);

  const getDate = timestamp => {
    const d = new window.Date(timestamp * 1000);
    const dateList = [
      d.getFullYear(),
      d.toLocaleString('en-US', { month: 'short' }),
      d.getDate(),
    ];

    setDate(dateList);
  };

  const getCurrencyRate = async () => {
    try {
      const res = await API.get(
        `live?access_key=${
          process.env.REACT_APP_CURRENCY_KEY
        }&currencies=${TAB_CURRENCY.join()}`,
      );
      setCurrencyToUSD(res.data.quotes);
      setLoading(false);
      getDate(res.data.timestamp);
      console.log('!');
    } catch (error) {
      console.error(error);
    }
  };

  const [amount, setAmount] = useState('1,000');
  const [source, setSource] = useState(TAB_CURRENCY[0]);
  const [receive, setReceive] = useState(TAB_CURRENCY[1]);

  const changeInput = e => {
    const { value } = e.target;
    setAmount(numAddComma(strToNum(value)));
    getCurrencyRate();
  };

  const changeSelect = e => {
    const { value } = e.target;
    if (value !== TAB_CURRENCY[0]) setReceive(TAB_CURRENCY[0]);
    else setReceive(TAB_CURRENCY[1]); // 앞으로 초기화

    setSource(value);
    getCurrencyRate();
  };

  const changeButton = e => {
    const { value } = e.target;
    setReceive(value);
  };

  useEffect(() => {
    if (loading) {
      getCurrencyRate();
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
                {receive}
                <CurrencyConverter
                  receive={currencyToUSD[`USD${receive}`]}
                  source={currencyToUSD[`USD${source}`]}
                  amount={strToNum(amount)}
                />
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
