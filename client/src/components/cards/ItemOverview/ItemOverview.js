import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ItemOverview.css";
import ModalAddOrder from "../../Modals/ModalAddOrder";
import ModalAddInvoice from "../../Modals/ModalAddInvoice";
import OrdersList from "./OrdersList";

const ItemOverview = () => {
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const itemId = useLocation().state.itemId;
  const itemName = useLocation().state.itemName;

  useEffect(() => {
    fetch("/api/v1/order", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.filter((o) => o.itemID === itemId));
      })
      .catch((err) => console.err);
  }, [itemId]);

  useEffect(() => {
    fetch("/api/v1/invoice", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setInvoices(
          data.filter((invoice) =>
            invoice.orders.some((orderId) => {
              console.log(orderId);
              console.log(orders);
              console.log(orders.includes((o2) => o2._id === orderId));
              return orders.includes((o2) => {
                console.log(o2._id);
                console.log(orderId);
                return o2._id === orderId;
              });
            })
          )
        );
      })
      .catch((err) => console.err);
  }, [orders]);

  return (
    <div>
      <header className="header">
        <h1>
          Inventory {">"} {itemName}
        </h1>
      </header>
      <hr className="hr-header" />

      <div className="order-overview">
        <p>
          Total Orders: <b>{orders.length}</b>
        </p>
        <p>
          Total Cost:{" "}
          <b>
            $
            {orders.reduce(
              (totalPrice, order) =>
                (totalPrice = totalPrice + Number(order.price)),
              0
            )}
          </b>
        </p>
        <p>
          Total Invoices: <b>{invoices.length}</b>
        </p>
        <div>
          <button
            className="add-ord-btn"
            onClick={() => setOpenOrderModal(true)}
          >
            <img src={require("../../../images/addnew.png")} alt="addnew" />
            <span>ADD ORDER</span>
          </button>
        </div>
      </div>
      <div className="item-overview-container">
        <div className="orders-list">
          <div className="ord-inv">
            <h1>Orders</h1>
            <button
              className="add-inv-btn"
              onClick={() => setOpenInvoiceModal(true)}
            >
              <span>Generate Invoice</span>
            </button>
          </div>
          <hr className="hr" />
          <OrdersList orders={orders} />
        </div>
        <div className="edit-item">
          <img
            src={require("../../../images/no-img.png")}
            alt="no-img"
            className="no-img"
          />
          <input
            className="input-item-name"
            type="text"
            value={itemName}
            name="itemName"
          />
          <div className="lower-btn">
            <button className="move-item">
              <img src={require("../../../images/add-folder.png")} alt="move" />
            </button>
            <button className="edit-itm">SAVE</button>
          </div>
        </div>
      </div>

      <ModalAddOrder
        open={openOrderModal}
        onClose={() => setOpenOrderModal(false)}
      />
      <ModalAddInvoice
        open={openInvoiceModal}
        onClose={() => setOpenInvoiceModal(false)}
      />
    </div>
  );
};

export default ItemOverview;
