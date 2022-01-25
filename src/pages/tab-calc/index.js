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
  const [currencyToUSD, setCurrencyToUSD] = useState(null);

  const [amount, setAmount] = useState('1,000');
  const [source, setSource] = useState(TAB_CURRENCY[0]);
  const [receive, setReceive] = useState(TAB_CURRENCY[1]);

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
        setCurrencyToUSD(res.data.quotes);
        setLoading(false);
        getDate(res.data.timestamp);
        localStorage.setItem('currencyRate', JSON.stringify(res.data));
      } catch (error) {
        console.error(error);
      }
    } else {
      setCurrencyToUSD(savedRateObject.quotes);
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
      {currencyToUSD && (
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
              currencyToUSD={currencyToUSD}
              source={source}
              setReceive={setReceive}
            />
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

const Tab = styled.div``;
const TabContents = styled.div``;
const Currency = styled.div``;
const Date = styled.div``;

export default TabCalc;
