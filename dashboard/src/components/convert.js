import React, { useState } from "react";
import { render } from "react-dom";
import axios from "axios";
import './styles.css';

const CurrencyConverter = () => {
  const [first, setFirst] = useState("AUD");
  const [second, setSecond] = useState("USD");
  const [rate, setRate] = useState([]);

  const getRate = (first, second) => {
    console.log(first, second)
    axios({
      method: "GET",
      url: `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=98ee080437d147a3bbef`,
    })
      .then((response) => {
        console.log(response.data);
        setRate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <div>
        <div
          style={{
            width: '450px',
            height: '100px',
            padding: '40px',
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "25px",
          }}
        >
          1 {first} = {rate[`${first}_${second}`]} {second}
        </div>
        <input
          type="text"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          className="currency"
        />
        <input
          type="text"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
          className="currency"
        />
        <button className="converter" onClick={() => {
            getRate(first, second);}}>
          Convert
        </button>
      </div>
    </>
  );
};

render(<CurrencyConverter />, document.querySelector("#root"));
export default CurrencyConverter;
