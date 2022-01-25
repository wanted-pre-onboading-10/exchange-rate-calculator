import { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from 'utils/api';
import { SIMPLE_CURRENCY_LIST } from 'utils/currency';

// styled components
const StyledContainer = styled.main`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 20rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }

  & > *:not(:first-child):not(:last-child) {
    display: flex;
    justify-content: space-between;
  }

  &>*: not(: first-child) {
    margin-top: 1rem;
  }
`;

const StyledButton = styled.button`
  background: #02ce89;
  color: #fff;
  font-weight: bold;
  border: 1px solid #02ce89;
  padding: 4px 0px;
  border-radius: 50px;
`;

const StyledTitle = styled.h1`
  color: #02ce89;
  font-weight: bold;
  padding: 4px 0px;
  margin: 12px;
`;

const StyledSelect = styled.select`
  background: #02ce89;
  color: #fff;
  padding: 4px 0;
  font-size: 16px;
  border-radius: 5px;
`;

const StyledInput = styled.input`
  border: 1px solid #d3d7e1;
  background: #fff;
  border-radius: 50px;
  padding: 4px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
`;

// constants
const CALCULATOR_TITLE = '환율 계산';
const SENDER_LABEL = '송금국가';
const SENDER_COUNTRY = '미국';
const SENDER_CURRENCY = 'USD';
const RECIPIENT_LABEL = '수취국가';
const CURRENCY_LABEL = '환율';
const ERROR_MESSAGE = '송금액이 바르지 않습니다';

const formatNumber = num => {
  if (typeof num !== 'number') return null;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
    .format(num)
    .slice(1);
};

const convertStrToNum = str => {
  const replaced = str.replace(/,/g, '');
  return parseFloat(replaced).toFixed(2);
};

function SimpleCalc() {
  const [currency, setCurrency] = useState('KRW');
  const [amount, setAmount] = useState(null);
  const [rate, setRate] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getRates = async () => {
      try {
        const res = await API.get(
          `live?access_key=${process.env.REACT_APP_CURRENCY_KEY}`,
        );
        const quote = res.data.quotes[`USD${currency}`];
        setRate(formatNumber(quote));
      } catch (e) {
        console.log(e);
      }
    };
    getRates();
  }, [currency]);

  const handleSelect = e => {
    if (showMessage) setShowMessage(prev => !prev);
    setCurrency(e.target.value);
  };

  const handleChange = e => {
    if (showMessage) setShowMessage(prev => !prev);
    setAmount(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      amount < 0 ||
      amount > 10000 ||
      amount === undefined ||
      amount === null ||
      amount === ''
    ) {
      setShowMessage(true);
      setIsWrong(true);
      setResult(0);
    } else {
      setShowMessage(true);
      setIsWrong(false);
      setResult(convertStrToNum(rate) * amount);
    }
  };

  return (
    <StyledContainer>
      <div>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTitle>{CALCULATOR_TITLE}</StyledTitle>
          <p>
            <span>{SENDER_LABEL}:</span>
            <span>
              {SENDER_COUNTRY} ({SENDER_CURRENCY})
            </span>
          </p>
          <label htmlFor="currency-box">
            {RECIPIENT_LABEL}:
            <StyledSelect
              name="currency"
              id="currency-box"
              onChange={handleSelect}>
              {SIMPLE_CURRENCY_LIST.map(({ currency: c, country }) => (
                <option value={c} key={c}>{`${country}(${c})`}</option>
              ))}
            </StyledSelect>
          </label>
          <p>
            <span>{CURRENCY_LABEL}:</span>
            <span>
              {rate} {currency}/{SENDER_CURRENCY}
            </span>
          </p>
          <label htmlFor="amount-box">
            송금액:
            <span>
              <StyledInput
                type="number"
                name="amount-box"
                id="amount-box"
                onChange={handleChange}
              />
              {SENDER_CURRENCY}
            </span>
          </label>
          <StyledButton type="submit">Submit</StyledButton>
        </StyledForm>
        {showMessage &&
          (isWrong ? (
            <ErrorMessage>{ERROR_MESSAGE}</ErrorMessage>
          ) : (
            <p>
              수취금액은 {formatNumber(result)} {currency}입니다.
            </p>
          ))}
      </div>
    </StyledContainer>
  );
}

export default SimpleCalc;
