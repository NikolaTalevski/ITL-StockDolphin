import React, { useEffect, useState } from "react";

import "./OrdersList.css";

const OrdersList = (props) => {
  const [orders, setOrders] = useState(props.orders);

  useEffect(() => {
    setOrders(props.orders);
  }, [props.orders]);

  return (
    <table id="orderList" className="myTable">
      <thead>
        <th>Quantity</th>
        <th>Total Price</th>
        <th>Price per unit</th>
        <th>Ordered At</th>
        <th>Supplier</th>
      </thead>
      <tbody>
        {orders.map((order) => {
          return (
            <tr key={order._id}>
              <td>{order.quantity} units</td>
              <td>$ {order.price}</td>
              <td>$ {Number(order.price) / Number(order.quantity)}</td>
              <td>{order.createdAt}</td>
              <td>{order.supplier}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrdersList;
