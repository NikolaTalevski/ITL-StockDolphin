import React, { useEffect, useState } from "react";
import "./RecentOrderList.css";
import { Carousel } from "react-responsive-carousel";
import "./carousel.min.css";

const RecentOrdersList = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [translation, setTranslation] = useState(0);
  const [itemsShown, setItemsShown] = useState(4);
  const noimg = require("../../../images/no-img.png");

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
        data.sort(
          (a, b) => 1 - (new Date(a.createdAt) - new Date(b.createdAt))
        );
        setRecentOrders(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleTranslate = (newTranslation) => {
    setTranslation(newTranslation);
    const elementToChange = document.querySelector(".slider");
    if (elementToChange) {
      elementToChange.style.transform = `translate3d(${newTranslation}%, 0px, 0px)`;
    }
  };

  const handlePrevClick = () => {
    if (itemsShown > 4) {
      handleTranslate(translation + 25);
      setItemsShown((current) => current - 1);
    }
  };

  const handleNextClick = () => {
    if (!(itemsShown >= recentOrders.length)) {
      handleTranslate(translation - 25);
      setItemsShown((current) => current + 1);
    }
  };

  return (
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        infiniteLoop={false}
        centerMode={true}
        centerSlidePercentage={25}
        showThumbs={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <button
            type="button"
            onClick={handlePrevClick}
            title={label}
            className="control-arrow control-prev"
            style={{ visibility: itemsShown > 4 ? "visible" : "hidden" }}
          />
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <button
            type="button"
            onClick={handleNextClick}
            title={label}
            className="control-arrow control-next"
            style={{
              visibility: !(itemsShown >= recentOrders.length)
                ? "visible"
                : "hidden",
            }}
          />
        )}
      >
        {recentOrders.map((recentOrder) => (
          <div key={recentOrder._id} className="recentordercard">
            <img src={noimg} alt="Order-Img" className="recentordercard-img" />
            <div className="recentordercard-bottom">
              <p className="recentordercard-title">{recentOrder.item.name}</p>
              <p className="recentordercard-description">
                <b>{recentOrder.quantity} Units | </b>$ {recentOrder.price}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default RecentOrdersList;
