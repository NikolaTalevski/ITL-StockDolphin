import React, { useEffect, useState } from "react";
import "./Inventorysummary.css";
import "../AddButton/AddButton.css";
import "./Inventory.css";
import { CURRENCY_SYMBOL } from "../../util/constants";
import ModalAddCategory from "../Modals/ModalAddCategory";
import CategoryCardList from "../cards/CategoryCard/CategoryCardList";

const Inventory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [numberCat, setNumberCat] = useState([0]);
  const [numberItems, setNumberItems] = useState([0]);
  const [numberOrders, setNumberOrders] = useState([0]);
  const [totalCost, setTotalCost] = useState([0]);

  useEffect(() => {
    fetch("/api/v1/category", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((allCategories) => {
        setNumberCat(allCategories.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch("/api/v1/item", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((allItems) => {
        setNumberItems(allItems.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch("/api/v1/order", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((allOrders) => {
        setNumberOrders(allOrders.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    const fetchOrderTotalPrice = () => {
      fetch("/api/v1/order/total-price", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTotalCost(data.totalPrice);
        })

        .catch((err) => {
          console.log(err);
        });
    };
    fetchOrderTotalPrice();
  }, []);

  return (
    <div>
      <header className="">
        <h1>Inventory </h1>
        <hr></hr>
      </header>
      <div className="top-btn">
        <div className="search">
          <img src={require("../../images/search.png")} alt="search" />
          <input
            type="text"
            name="categories"
            placeholder="Search Categories"
            className="search-input"
          />
        </div>

        <div className="add">
          <button className="add-btn" onClick={() => setOpenModal(true)}>
            <img src={require("../../images/addnew.png")} alt="addnew" />
            <span>ADD CATEGORY</span>
          </button>
        </div>
      </div>
      <div className="inventory-info">
        <p>
          Categories: <b>{numberCat}</b>
        </p>
        <p>
          Items: <b>{numberItems}</b>{" "}
        </p>
        <p>
          Total Orders: <b>{numberOrders}</b>{" "}
        </p>
        <p>
          Total Cost: <b>{CURRENCY_SYMBOL + totalCost}</b>{" "}
        </p>
      </div>
      <ModalAddCategory open={openModal} onClose={() => setOpenModal(false)} />
      <CategoryCardList />
    </div>
  );
};

export default Inventory;
