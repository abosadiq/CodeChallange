import React, { useState, useEffect } from "react";
import EachItem from "./EachItem";
const Points = () => {
  let initialVlaues = JSON.parse(window.localStorage.getItem("purchasedItem"));
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [purchasedItem, setPurchasedItem] = useState(initialVlaues);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    JSON.parse(localStorage.getItem("purchasedItem"));
    setPurchasedItem(purchasedItem);
    window.localStorage.setItem("purchasedItem", JSON.stringify(purchasedItem));
    let totalPoints = purchasedItem.reduce((prev, cur) => {
      return prev + parseInt(cur.point);
    }, 0);
    setTotal(totalPoints);
  }, [purchasedItem]);

  const onSubmit = () => {
    if (amount === "") {
      alert("Please Enter a item and its price");
    } else if (isNaN(amount)) {
      alert("Please Enter a Number");
    } else {
      let pointsRewarded = 0;
      let price = parseInt(amount);
      if (price > 100) {
        pointsRewarded = (price - 100) * 2;
        pointsRewarded += 50;
      } else if (50 < price < 100) {
        pointsRewarded = (price - 50) * 1;
      }
      if (price < 50) {
        pointsRewarded = price * 0;
      }
      setAmount(pointsRewarded);
      let newItem = {
        item: item,
        amount: amount,
        custNo: Date.now(),
        point: pointsRewarded,
      };

      let newArr = [...purchasedItem, newItem];
      setPurchasedItem(newArr);

      setItem("");
      setAmount("");
    }
  };

  return (
    <div className="App">
      <header className="App-header">Coding Challenge</header>

      <section className="section inputs-section">
        <h2>Purchase Item</h2>
        <div className="item">
          <label>Product Name</label>
          <input
            name="item"
            className="input"
            placeholder="Entet Item Name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div className="item">
          <label>Price</label>
          <input
            className="input"
            placeholder="Enter Price"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="item-last">
          <button className="btn" onClick={onSubmit}>
            {" "}
            Purchased{" "}
          </button>
        </div>
      </section>
      {purchasedItem && !!purchasedItem.length && (
        <section className="section">
          <h2>List of Purchased item and Rewards</h2>
          <p>Total Points: {total}</p>
          <table className="table">
            <thead className="thead">
              <tr>
                <td>Customer Id</td>
                <td>Product</td>
                <td>Price</td>
                <td>Points</td>
              </tr>
            </thead>
            <tbody>
              {purchasedItem.map((item) => {
                return <EachItem item={item} />;
              })}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default Points;
