// External Dependencies
import axios from "axios";

export const getCoins = () =>
  axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false`
  );

export const getCoinData = async (coin) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coin}?vs_currency=usd`
  );
  return Number(res.data.market_data.current_price.usd);
};
