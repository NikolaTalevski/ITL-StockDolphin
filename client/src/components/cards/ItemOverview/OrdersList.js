import React, { useEffect, useState } from "react";

import "./OrdersList.css";

const OrdersList = (props) => {
  const [orders, setOrders] = useState(props.orders);

  const sortTable = (n) => {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("orderList");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir === "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  };

  useEffect(() => {
    setOrders(props.orders);
  }, [props.orders]);

  // useEffect(() => {
  //   if (props.newOrder !== null)
  //     setOrders((currentOrders) => [...currentOrders, props.newOrder]);
  // }, [props.newOrder]);

  return (
    <table id="orderList" className="myTable">
      <thead>
        <th onClick={() => sortTable(0)}>Quantity</th>
        <th onClick={() => sortTable(1)}>Total Price</th>
        <th onClick={() => sortTable(2)}>Price per unit</th>
        <th onClick={() => sortTable(3)}>Ordered At</th>
        <th onClick={() => sortTable(4)}>Supplier</th>
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
