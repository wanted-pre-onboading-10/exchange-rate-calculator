import { useState, useEffect } from 'react';
import axios from 'axios';

const currencyList = [
  { currency: 'KRW', country: '한국' },
  { currency: 'JPY', country: '일본' },
  { currency: 'PHP', country: '필리핀' },
];

function SimpleCalc() {
  const [currency, setCurrency] = useState('KRW');
  const [amount, setAmount] = useState(0);

  const handleSelect = e => {
    setCurrency(e.target.value);
  };

  const handleChange = e => {
    setAmount(e.target.value);
  };

  return (
    <>
      <form>
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
        <p>환율: 1,119.93 {currency}/USD</p>
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
      <p>수취금액은 111,993.00 {currency}입니다.</p>
    </>
  );
}

export default SimpleCalc;
