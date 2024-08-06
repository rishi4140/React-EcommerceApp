// CartItems.js
// This component displays the list of items in the cart and provides options to update or remove them.

import React from "react";
import Cart from "./Cart"; // Import Cart component to render individual cart items
import styled from "styled-components";
import { useSelector } from "react-redux";

// Styled component for price detail section
const PriceDetail = styled.div`
  width: 45%;
  height: fit-content;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

/**
 * CartItems Component
 * 
 * Renders the cart items and provides a summary of the total price and discounts.
 * Uses Redux to manage and display the state of cart items.
 */
export default function CartItems() {
  const CartItem = useSelector((state) => state.cart); // Access cart items from Redux store
  const totalItem = useSelector((state) => state.totalCart); // Access total cart count from Redux store

  // Calculate the total price of items in the cart
  const totalPrice = CartItem.reduce((total, item) => {
    return (total += item.price * item.qty);
  }, 0);

  // Calculate the total discount for items in the cart
  const totalDiscount = CartItem.reduce((total, item) => {
    return (total += (item.price * item.qty * item.discountPercentage) / 100);
  }, 0);

  // Render message if cart is empty
  if (CartItem.length === 0)
    return <h1 className="text-center mt-5">Your cart is empty</h1>;

  return (
    <div className="container-sm d-flex flex-column flex-lg-row mt-4 gap-3">
      <div className="d-flex flex-column gap-3">
        {CartItem.map((item) => (
          <Cart item={item} key={item.id} /> // Render individual cart items
        ))}
      </div>
      {/* Price summary section */}
      <PriceDetail className="bg-white p-5 d-flex flex-column gap-2">
        <span className="fs-5 pb-2 fw-bold">Price Details</span>
        <div className="d-flex justify-content-between">
          <span>Price ({totalItem} item)</span>
          <span>{totalPrice}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Discount</span>
          <span>{Math.floor(totalDiscount)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="">Delivery Charges</span>
          <span className="text-success">Free</span>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <h5>Total Amount</h5>
          <span>{totalPrice - Math.floor(totalDiscount)}</span>
        </div>
      </PriceDetail>
    </div>
  );
}
