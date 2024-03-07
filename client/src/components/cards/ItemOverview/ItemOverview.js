import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ItemOverview.css";
import ModalAddOrder from "../../Modals/ModalAddOrder";
import ModalAddInvoice from "../../Modals/ModalAddInvoice";
import OrdersList from "./OrdersList";
import ModalMoveItem from "../../Modals/ModalMoveItem";

const ItemOverview = () => {
  const [item, setItem] = useState({});
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [openMoveItemModal, setOpenMoveItemModal] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const [newOrders, setNewOrders] = useState(null);
  const itemId = useLocation().state.itemId;
  // const itemName = useLocation().state.itemName;

  const OrderAdded = (newOrder) => {
    setNewOrders(newOrder);
  };

  useEffect(() => {
    fetch(`/api/v1/item/${itemId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        setEditedItem(data);
      })
      .catch((err) => console.err);
  }, [itemId]);

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
    getInvoices();
  }, [orders]);

  const getInvoices = () => {
    fetch("/api/v1/invoice", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setInvoices(
          data.filter((invoice) =>
            invoice.orders.some((orderId) =>
              orders.some((o2) => o2._id === orderId)
            )
          )
        )
      )
      .catch((err) => console.err);
  };

  const handleSaveItem = (updateItem) => {
    fetch(`/api/v1/item/${item._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(updateItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update item: ", data);
        setItem(data);
      })
      .catch((err) => console.err);
  };

  return (
    <div>
      <header className="header">
        <h1>
          Inventory {">"} {item.name}
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
          <OrdersList orders={orders} newOrder={newOrders} />
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
            value={editedItem.name}
            name="itemName"
            onChange={(e) => {
              const updatedItem = { ...editedItem };
              updatedItem.name = e.target.value;
              setEditedItem(updatedItem);
            }}
          />
          <div className="lower-btn">
            <button
              className="move-item"
              onClick={() => setOpenMoveItemModal(true)}
            >
              <img src={require("../../../images/add-folder.png")} alt="move" />
            </button>
            <button
              className="edit-itm"
              onClick={() => handleSaveItem(editedItem)}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>

      <ModalAddOrder
        onAdd={OrderAdded}
        open={openOrderModal}
        onClose={() => setOpenOrderModal(false)}
        item={item}
      />
      <ModalMoveItem
        open={openMoveItemModal}
        onClose={() => setOpenMoveItemModal(false)}
        onMoveItem={(categoryId) => {
          item.categoryId = categoryId;
          handleSaveItem(item);
        }}
        categoryId={item.categoryId}
      />
      <ModalAddInvoice
        open={openInvoiceModal}
        onClose={() => setOpenInvoiceModal(false)}
        onInvoiceAdded={() => getInvoices()}
        orders={orders}
      />
    </div>
  );
};

export default ItemOverview;
