import { useEffect, useState } from 'react';
import styled from 'styled-components';

import API from 'utils/api';
import { TAB_CURRENCY } from 'utils/currency';
import { strToNum } from 'utils/convert';

import CurrencyConverter from 'components/converter';
import InputBox from 'pages/tab-calc/InputBox';
import TabMenu from './TabMenu';

function TabCalc() {
  const [loading, setLoading] = useState(true);
  const [currencyRate, setCurrencyRate] = useState(null);
  const [amount, setAmount] = useState('1,000');
  const [source, setSource] = useState(TAB_CURRENCY[0]);
  const [receive, setReceive] = useState(TAB_CURRENCY[1]);
  const [date, setDate] = useState([]);

  const getDate = timestamp => {
    const currencyDate = new window.Date(timestamp * 1000);
    const dateList = [
      currencyDate.getFullYear(),
      currencyDate.toLocaleString('en-US', { month: 'short' }),
      currencyDate.getDate(),
    ];
    setDate(dateList);
  };

  const getCurrencyRate = async () => {
    const savedRateObject = JSON.parse(localStorage.getItem('currencyRate'));
    const savedDate =
      savedRateObject &&
      new window.Date(savedRateObject.timestamp * 1000).getDate();
    if (savedDate !== new window.Date().getDate()) {
      try {
        const res = await API.get(
          `live?access_key=${
            process.env.REACT_APP_CURRENCY_KEY
          }&currencies=${TAB_CURRENCY.join()}`,
        );
        setCurrencyRate(res.data.quotes);
        setLoading(false);
        getDate(res.data.timestamp);
        localStorage.setItem('currencyRate', JSON.stringify(res.data));
      } catch (error) {
        console.error(error);
      }
    } else {
      setCurrencyRate(savedRateObject.quotes);
      getDate(savedRateObject.timestamp);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      getCurrencyRate();
    }
  }, [loading]);

  return (
    <Container>
      {loading && <div>loading</div>}
      {currencyRate && (
        <>
          <InputBox
            amount={amount}
            setAmount={setAmount}
            setSource={setSource}
            setReceive={setReceive}
            getRate={getCurrencyRate}
          />
          <Tab>
            <TabMenu
              currencyRate={currencyRate}
              source={source}
              setReceive={setReceive}
            />
            <TabContents>
              <Currency>
                <CurrencyWord>{receive}</CurrencyWord>
                <CurrencyConverter
                  receive={currencyRate[`USD${receive}`]}
                  source={currencyRate[`USD${source}`]}
                  amount={strToNum(amount)}
                />
              </Currency>
              <Date>
                <DateTitle>
                  기준일 :<br />
                </DateTitle>
                <DateContent>{date.join('-')}</DateContent>
              </Date>
            </TabContents>
          </Tab>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 20px;
  width: 300px;
  border: 5px solid #333;
`;

const Tab = styled.div``;

const TabContents = styled.div`
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  height: 300px;
`;

const Currency = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
  & > * {
    margin-right: 5px;
  }
`;

const CurrencyWord = styled.span`
  margin-bottom: 10px;
`;

const Date = styled.div``;

const DateTitle = styled.p`
  margin-bottom: 3px;
`;

const DateContent = styled.p``;

export default TabCalc;
