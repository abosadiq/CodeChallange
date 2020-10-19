import React, { useState, useEffect } from "react";
const Points = () => {
  var items = JSON.parse(localStorage.getItem("transactions")) || [];
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [purchasedItem, setPurchasedItem] = useState(items);

  const [total, setTotal] = useState(0);
  const [eachMonth, setEachMonth] = useState(0);
  const [monthName, setMonthName] = useState("");

  useEffect(() => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let monthArr = [];

    setPurchasedItem(purchasedItem);
    let totalPoints = purchasedItem.reduce((prev, cur) => {
      return prev + parseInt(cur.point);
    }, 0);
    setTotal(totalPoints);
    if (items && items.length) {
      items &&
        items.map((x, i) => {
          let d = new Date();
          let itemDate = new Date(x.custNo);
          monthArr.push(x);
          let threeMonth = d.setMonth(d.getMonth() - 3);
          if (itemDate < threeMonth) {
            x.point = 0;
            let transactions = JSON.parse(localStorage.getItem("transactions"));
            // transactions.splice(i, 1);
            transactions[i] = x;
            localStorage.setItem("transactions", JSON.stringify(transactions));
          }
          return 0;
        });
      monthArr.map((mnth) => {
        let itemDate = new Date(mnth.custNo);
        var checkMonth = monthNames[itemDate.getMonth()];
        if (mnth) {
          monthArr.map((nest) => {
            let nestDate = new Date(nest.custNo);
            var nestMonth = monthNames[nestDate.getMonth()];
            if (nestMonth === checkMonth) {
              if (nest.custNo !== mnth.custNo) {
                let pointsForEachMonth = nest.point + mnth.point;
                setEachMonth(pointsForEachMonth);
                setMonthName(nestMonth);
              }
            }
            return 0;
          });
        }
        return null;
      });
    }
  }, [purchasedItem, items]);

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
      localStorage.setItem("transactions", JSON.stringify(newArr));
    }
  };
  const availableTransactions = JSON.parse(localStorage.getItem("transactions"))
    ? JSON.parse(localStorage.getItem("transactions"))
    : purchasedItem;
  return (
    <div className="App">
      <header className="App-header">Coding Challenge</header>

      <section className="section">
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
      {availableTransactions && !!availableTransactions.length && (
        <section className="section">
          <h2>List of Purchased item and Rewards</h2>
          <p>Total Points: {total}</p>
          <p>
            Points in {monthName} : {eachMonth}
          </p>
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
              {availableTransactions &&
                availableTransactions.length &&
                availableTransactions.map((item) => {
                  return (
                    <tr key={item.custNo}>
                      <td> {item.custNo}</td>
                      <td>{item.item}</td>
                      <td>${item.amount}</td>
                      <td> {item.point}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default Points;
