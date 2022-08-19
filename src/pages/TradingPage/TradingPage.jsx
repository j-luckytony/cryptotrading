// External Dependencies
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

// Internal Dependencies
import { getCoins, getCoinData } from "./../../api/getCoins";
import "./style.css";

const TradingPage = () => {
  const { data, isLoading, isError } = useQuery("assets", getCoins, {
    refetchOnWindowFocus: true,
  });

  const [coinA, setCoinA] = useState({ amount: 0, usd: 0, price: 1 });
  const [coinB, setCoinB] = useState({ amount: 0, usd: 0, price: 1 });
  const [curType, setCurType] = useState(-1);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (changed) handleChange(curType);
  }, [curType, changed]);

  const handleCoinSelect = async (e, type) => {
    if (type === 0)
      setCoinA({
        ...coinA,
        id: e.target.value,
        price: await getCoinData(e.target.value),
      });
    else
      setCoinB({
        ...coinB,
        id: e.target.value,
        price: await getCoinData(e.target.value),
      });
    setCurType(type);
    setChanged(true);
  };

  const handleInput = (e, type) => {
    if (type === 0) setCoinA({ ...coinA, amount: Number(e.target.value) });
    else setCoinB({ ...coinB, amount: Number(e.target.value) });
    setCurType(type * 2);
    setChanged(true);
  };

  const handleChange = (type) => {
    switch (type) {
      case 0:
      case 2:
        setCoinA({ ...coinA, usd: coinA.amount * coinA.price });
        setCoinB({
          ...coinB,
          amount: coinB.price && (coinA.amount * coinA.price) / coinB.price,
          usd: coinA.amount * coinA.price,
        });
        break;
      case 1:
      case 3:
        setCoinB({ ...coinB, usd: coinB.amount * coinB.price });
        setCoinA({
          ...coinA,
          amount: coinA.price && (coinB.amount * coinB.price) / coinA.price,
          usd: coinB.amount * coinB.price,
        });
        break;
      default:
        break;
    }
    setChanged(false);
  };

  const container = (type) => {
    return (
      <div className="w-full border-dark-700 hover:border-dark-200 rounded-[14px] border bg-slate-900 p-3 flex flex-col gap-4">
        <div>
          <select
            id="countries"
            defaultValue={"US"}
            className="w-min overscroll-auto bg-slate-900 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              handleCoinSelect(e, type);
            }}
          >
            <option value="choose">Choose a Coin</option>
            {!isLoading && !isError ? (
              data.data.map((coin) => (
                <option value={coin.id} key={coin.id}>
                  {coin.name}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
        </div>
        <div className="flex justify-around">
          <input
            type="number"
            className="bg-slate-900 outline-0 appearance-none"
            value={type === 0 ? coinA.amount : coinB.amount}
            onChange={(e) => handleInput(e, type)}
          />
          <p>{type === 0 ? coinA.usd : coinB.usd}$</p>
        </div>
      </div>
    );
  };
  return (
    <div className="text-white w-6/12 m-auto flex flex-col justify-center bg-gray-300 rounded-3xl px-3 py-6 gap-4">
      {container(0)}
      {container(1)}
    </div>
  );
};

export default TradingPage;
