import React from "react";

const EachItem = ({ item }) => {
  return (
    <tr key={item.custNo}>
      <td> {item.custNo}</td>
      <td>{item.item}</td>
      <td>${item.amount}</td>
      <td> {item.point}</td>
    </tr>
  );
};

export default EachItem;
