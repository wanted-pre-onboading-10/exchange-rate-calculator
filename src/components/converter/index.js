import { roundToSecond } from 'utils/convert';
import propTypes from 'prop-types';

function CurrencyConverter({ receive, source, amount }) {
  const convert = (receive / source) * amount;

  return <div>{roundToSecond(convert)}</div>;
}

CurrencyConverter.propTypes = {
  receive: propTypes.number.isRequired,
  source: propTypes.number.isRequired,
  amount: propTypes.number.isRequired,
};

export default CurrencyConverter;
