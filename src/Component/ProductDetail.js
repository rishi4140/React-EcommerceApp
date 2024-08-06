// ProductDetail.js
// This component displays detailed information about a selected product.

import React from "react";
import BasicRating from "./BasicRating";
import { addCart, CartItems } from "../actions";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from "../Notification/toast";
import styled from "styled-components";

// Styled components for layout and styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: auto;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  width: 150px;
  background-color: #ff5722;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #e64a19;
  }
`;

/**
 * ProductDetail Component
 * 
 * Displays detailed information about a product, including images, title, rating, price,
 * discount, category, stocks, and description. Provides an option to add the product to the cart.
 */
export default function ProductDetail({ item }) {
  const dispatchCart = useDispatch(); // Hook to dispatch actions to the Redux store
  const dispatchTotal = useDispatch(); // Hook for dispatching actions to update total cart items

  /**
   * Handles the action of adding a product to the cart.
   * Dispatches actions to update cart state and shows a success toast message.
   * 
   * @param {Object} item - The product object to be added to the cart.
   */
  function handleClick(item) {
    if (!item.qty) {
      item.qty = 1;
      dispatchCart(addCart(item)); // Dispatch action to add product to cart
      dispatchTotal(CartItems()); // Dispatch action to update total cart items
      showToastMessage("Item added to cart", "success"); // Show success toast message
    } else {
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      showToastMessage("Item added to cart", "success");
    }
  }

  return (
    <Container>
      <ToastContainer />
      {/* Display carousel of product images */}
      {item.images ? (
        <div className="carousel-container">
          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            style={{ height: "100%" }}
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {item.images.map((_, index) => (
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                  key={index}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {item.images.map((image, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  data-bs-interval="10000"
                  key={index}
                >
                  <Image
                    src={image}
                    alt="Product"
                    className="d-block w-100"
                    style={{ height: "38rem" }}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      ) : (
        <Image src={item.thumbnail} alt="Product" />
      )}

      {/* Display product details */}
      <Details>
        <div className="d-flex flex-column gap-2">
          <span>{item.title}</span>
          <span>
            <BasicRating value={item.rating} />
          </span>
          <div className="d-flex gap-3">
            <span className="text-success">
              <span className="text-danger">Price:</span> Rs {item.price}
            </span>
            <span className="text-danger">
              Discount:
              <span className="text-success">
                {item.discountPercentage ? item.discountPercentage : ""}%
              </span>
            </span>
          </div>
          <span className="text-danger">
            Category: <span className="text-success">{item.category}</span>
          </span>
        </div>
        <div className="d-flex flex-column gap-3">
          <span className="text-danger">
            Stocks:
            <span className="text-success">{item.stock ? item.stock : ""}</span>
          </span>
          <span>{item.description}</span>
        </div>

        {/* Add to Cart Button */}
        <Button onClick={() => handleClick(item)}>
          Add to Cart
        </Button>
      </Details>
    </Container>
  );
}
