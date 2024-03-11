import React, { useEffect, useState } from "react";
import "./Inventorysummary.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InventorySummary = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [dateFrom, setDateFrom] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState(
    new Date(Date.now()).toISOString().slice(0, 10)
  );

  useEffect(() => {
    fetch("/api/v1/order", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((orders) => {
        const ordersData = orders.map((order) => {
          const createdAtWithTime = new Date(order.createdAt);

          const year = createdAtWithTime.getUTCFullYear();
          const month = createdAtWithTime.getUTCMonth();
          const day = createdAtWithTime.getUTCDate();

          const createdAtDate = new Date(year, month, day);
          return {
            itemId: order.item._id,
            itemName: order.item.name,
            categoryId: order.item.categoryId,
            createdAt: createdAtDate,
            price: parseFloat(order.price),
          };
        });
        setOrders(ordersData);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("/api/v1/category", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((categories) => setCategories(categories))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (orders && orders.length !== 0) handleShow();
  }, [orders]);

  const handleShow = () => {
    const filteredData = orders.filter((order) => {
      return (
        (!dateFrom || order.createdAt >= new Date(dateFrom)) &&
        (!dateTo || order.createdAt <= new Date(dateTo)) &&
        (!selectedCategoryId ||
          selectedCategoryId === "null" ||
          order.categoryId === selectedCategoryId)
      );
    });

    const groupedOrders = groupOrdersByItemID(filteredData);
    const chartData = createChartData(groupedOrders);
    setChartData(chartData);
  };

  const groupOrdersByItemID = (ordersData) => {
    return ordersData.reduce((acc, order) => {
      if (!acc[order.itemId]) {
        acc[order.itemId] = [];
      }
      acc[order.itemId].push(order);
      return acc;
    }, {});
  };

  const createChartData = (groupedOrders) => {
    const chartData = { labels: [], datasets: [] };

    const datesWithOrdersPlaced = [];
    for (const itemId in groupedOrders) {
      groupedOrders[itemId].forEach((order) => {
        if (
          !datesWithOrdersPlaced.some(
            (d) => d.getTime() === order.createdAt.getTime()
          )
        ) {
          datesWithOrdersPlaced.push(order.createdAt);
        }
      });
    }

    datesWithOrdersPlaced.sort((a, b) => a - b);

    for (const itemId in groupedOrders) {
      const dataset = {
        label: groupedOrders[itemId][0].itemName,
        data: [],
        borderColor: randomColor(),
        backgroundColor: randomColor(),
        tension: 0.1,
      };

      datesWithOrdersPlaced.forEach((date) => {
        const ordersOnGivenDate = groupedOrders[itemId].filter(
          (o) => o.createdAt.getTime() === date.getTime()
        );
        let totalPrice = 0;
        ordersOnGivenDate.forEach((order) => {
          totalPrice += parseFloat(order.price);
        });
        dataset.data.push(totalPrice);
      });

      chartData.datasets.push(dataset);
    }

    chartData.labels = datesWithOrdersPlaced.map((o) =>
      o.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );

    return chartData;
  };

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const options = {
    responsive: true,
  };

  return (
    <div className="inventory-summary-container">
      <header className="header">
        <h1>Reports {" > "} Inventory Summary</h1>
      </header>
      <hr />
      <div className="filter-section">
        <label>Date from: </label>
        <input
          className="input-datefrom"
          type="date"
          value={dateFrom}
          onChange={(e) =>
            setDateFrom(new Date(e.target.value).toISOString().slice(0, 10))
          }
        />
        <label>Date to: </label>
        <input
          className="input-dateto"
          type="date"
          value={dateTo}
          onChange={(e) =>
            setDateTo(new Date(e.target.value).toISOString().slice(0, 10))
          }
        />
        <select
          id="categoriesDropdown"
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="null">All categories</option>
          {categories.map((category) => {
            return <option value={category._id}>{category.name}</option>;
          })}
        </select>
        <button className="show-btn" onClick={handleShow}>
          SHOW
        </button>
      </div>
      <div className="inventory-content">
        {chartData && <Line options={options} data={chartData} />}
      </div>
    </div>
  );
};

export default InventorySummary;
