import { useState, useEffect } from 'react';
import axios from 'axios';

const currencyList = [
  { currency: 'KRW', country: '한국' },
  { currency: 'JPY', country: '일본' },
  { currency: 'PHP', country: '필리핀' },
];

function SimpleCalc() {
  const [currency, setCurrency] = useState('KRW');
  const [amount, setAmount] = useState(null);
  const [rate, setRate] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [result, setResult] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://www.apilayer.net/api/live?access_key=${process.env.REACT_APP_CURRENCY_KEY}`,
      )
      .then(res => {
        setRate(res.data.quotes[`USD${currency}`]);
      })
      .catch();
  }, [currency]);

  const handleSelect = e => {
    setCurrency(e.target.value);
  };

  const handleChange = e => {
    setAmount(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      amount < 0 ||
      amount > 10000 ||
      amount === undefined ||
      amount === null
    ) {
      setShowMessage(true);
      setIsWrong(true);
      setResult(0);
    } else {
      setShowMessage(true);
      setIsWrong(false);
      setResult(rate * amount);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>환율 계산</h1>
        <p>송금국가: 미국(USD)</p>
        <label htmlFor="currency-box">
          수취국가:
          <select name="currency" id="currency-box" onChange={handleSelect}>
            {currencyList.map(({ currency: c, country }) => (
              <option value={c} key={c}>{`${country}(${c})`}</option>
            ))}
          </select>
        </label>
        <p>
          환율: {rate} {currency}/USD
        </p>
        <label htmlFor="amount-box">
          송금액:
          <input
            type="number"
            name="amount-box"
            id="amount-box"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {showMessage && isWrong && <p>송금액이 바르지 않습니다</p>}
      {showMessage && !isWrong && (
        <p>
          수취금액은 {result} {currency}입니다.
        </p>
      )}
    </>
  );
}

export default SimpleCalc;
