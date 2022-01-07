import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cost, setCost] = useState(1);
  const [seed, setSeed] = useState(1000);
  const onChange = (event) => {
    setCost(event.target.value);
    setSeed(1);
  };
  const handleInput = (event) => {
    setSeed(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setCost(json[0].quotes.USD.price);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onChange}>
            {coins.map((coin, index) => (
              <option
                key={index}
                value={coin.quotes.USD.price}
                id={coin.symbol}
                symbol={coin.symbol}
              >
                {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <p></p>
          <span>현재 소유 달러:</span>
          <input type="number" value={seed} onChange={handleInput} /> USD
          <h4>구매 가능한 코인 수: 약 {Math.round(seed / cost)} 개</h4>
        </div>
      )}
    </div>
  );
}

export default App;
