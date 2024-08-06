import React from "react";
import { useDispatch } from "react-redux";
import { CartItems } from "../actions";
import { updateCart, DeleteCart } from "../actions";
import styled from "styled-components";

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const CartImage = styled.img`
  width: 50%;
  height: auto;
  max-height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const CartDetails = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const PriceTag = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #ff5722;
`;

const QtyButton = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const QtyDisplay = styled.span`
  border: 1px solid #ddd;
  padding: 5px 15px;
  border-radius: 4px;
`;

export default function Cart({ item }) {
  const dispatch = useDispatch();

  // Increase quantity of product
  function handlePlus(item) {
    item.qty += 1;
    dispatch(updateCart(item));
    dispatch(CartItems());
  }

  // Decrease quantity of product
  function handleMinus(item) {
    if (item.qty > 1) {
      item.qty -= 1;
      dispatch(updateCart(item));
      dispatch(CartItems());
    }
  }

  // Delete product from cart
  function handleCancel(item) {
    dispatch(DeleteCart(item));
    dispatch(CartItems());
  }

  return (
    <CartItemContainer>
      {/* Left part */}
      <CartImage src={item.thumbnail} alt={item.title} />

      {/* Right part */}
      <CartDetails>
        <h5>{item.title}</h5>
        <PriceTag>
          Price: Rs {item.price}
        </PriceTag>

        <div className="d-flex gap-3 mt-3 align-items-center">
          <QtyButton
            src="https://cdn-icons-png.flaticon.com/512/6941/6941676.png"
            alt="Increase quantity"
            onClick={() => handlePlus(item)}
          />
          <QtyDisplay>{item.qty}</QtyDisplay>
          <QtyButton
            src="https://cdn-icons-png.flaticon.com/512/1828/1828777.png"
            alt="Decrease quantity"
            onClick={() => handleMinus(item)}
          />
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleCancel(item)}
          >
            Remove
          </button>
        </div>
      </CartDetails>
    </CartItemContainer>
  );
}
