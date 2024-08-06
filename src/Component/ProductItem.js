import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BasicRating from "./BasicRating";
import { ProductToview, addproducts, addCart, CartItems } from "../actions";
import customFetch from "../apiCall";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../Notification/toast";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

// Styled components for consistent styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
`;

const PriceRatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-left: auto;
`;

const Button = styled.button`
  width: 9rem;
  background-color: #ff5722;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e64a19;
  }
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

/**
 * ProductItem Component
 * 
 * This component renders individual product details including the image,
 * title, price, rating, and description. It provides options to add to the cart,
 * edit, or delete the product.
 */
export default function ProductItem({ item }) {
  const [addedItem, setAddedItem] = useState(true); // State to track if item is added to cart
  const [title, setTitle] = useState(item.title); // State for editing title
  const [price, setPrice] = useState(item.price); // State for editing price
  const [rating, setRating] = useState(item.rating); // State for editing rating
  const [description, setDescription] = useState(item.description); // State for editing description
  const products = useSelector((state) => state.products); // Access products state from Redux store
  const dispatch = useDispatch(); // Initialize Redux dispatch function
  const navigate = useNavigate(); // Hook for programmatic navigation

  /**
   * Navigates to the product details page when the product image is clicked.
   * 
   * @param {Object} item - The product item to view details for.
   */
  function handleClick(item) {
    dispatch(ProductToview(item)); // Dispatch action to set the product to view
    navigate(`/productdetails/${item.id}`); // Navigate to product details page
  }

  /**
   * Adds the product to the cart or navigates to the cart if already added.
   * 
   * @param {Object} item - The product item to add to the cart.
   */
  function handleCart(item) {
    if (addedItem) {
      item.qty = 1;
      dispatch(addCart(item)); // Dispatch action to add product to cart
      dispatch(CartItems()); // Dispatch action to update cart items
      setAddedItem(false); // Update state to reflect item added to cart
      showToastMessage("Item added to cart", "success"); // Show success toast
    } else {
      navigate("/cart"); // Navigate to cart page if item is already added
    }
  }

  /**
   * Enables edit mode for the product item.
   * 
   * @param {Object} item - The product item to edit.
   */
  function handleEdit(item) {
    item.edit = false;
    dispatch(addproducts([...products])); // Update Redux store to reflect edit mode
  }

  /**
   * Deletes the product from the list and updates the Redux store.
   * 
   * @param {Object} item - The product item to delete.
   */
  function handleDeleteProduct(item) {
    const url = `https://my-json-server.typicode.com/jaiswalaryan/data/products/${item.id}`;
    customFetch(url, { method: "DELETE" });

    const updatedProducts = products.filter((product) => product.id !== item.id);
    dispatch(addproducts([...updatedProducts])); // Update Redux store with updated products
    showToastMessage("Item deleted", "warning"); // Show warning toast
  }

  /**
   * Cancels edit mode and reverts changes for the product item.
   * 
   * @param {Object} item - The product item to cancel editing.
   */
  function handleCancel(item) {
    item.edit = true;
    dispatch(addproducts([...products])); // Update Redux store to reflect cancel
  }

  /**
   * Saves the edited product details by making a PUT request and updating the Redux store.
   * 
   * @param {Object} item - The product item to save changes for.
   */
  function handleSave(item) {
    const url = `https://my-json-server.typicode.com/jaiswalaryan/data/products/${item.id}`;
    customFetch(url, {
      body: {
        ...item,
        title,
        price,
        rating,
        description,
        edit: true,
      },
      method: "PUT",
    }).then((data) => {
      const updatedProducts = products.map((product) =>
        product.id === item.id ? data : product
      );

      dispatch(addproducts([...updatedProducts])); // Update Redux store with updated product
      showToastMessage("Edit successful", "success"); // Show success toast
    });
  }

  return (
    <Container>
      <ToastContainer />

      {/* Left Section */}
      <Image
        src={item.thumbnail}
        alt={item.title}
        onClick={() => handleClick(item)}
      />

      {/* Right Section */}
      <Details>
        {item.edit ? (
          <span>{item.title}</span>
        ) : (
          <input
            type="text"
            value={title}
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        )}

        <PriceRatingContainer>
          {item.edit ? (
            <span>Rs {item.price}</span>
          ) : (
            <input
              type="text"
              value={price}
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          )}

          {item.edit ? (
            <BasicRating value={item.rating} />
          ) : (
            <div>
              <h5>Ratings:</h5>
              <input
                type="number"
                max={"5"}
                min={"0"}
                value={rating}
                step={"0.5"}
                className="form-control"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
          )}
        </PriceRatingContainer>

        {item.edit ? (
          <Description>{item.description}</Description>
        ) : (
          <textarea
            className="form-control"
            value={description}
            style={{ width: "20rem", height: "5rem" }}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        )}
      </Details>

      {/* Footer Section */}
      <ButtonContainer>
        {item.edit ? (
          <Button onClick={() => handleCart(item)}>
            {addedItem ? "Add to Cart" : "Go to Cart"}
          </Button>
        ) : (
          <Button onClick={() => handleCancel(item)}>Cancel</Button>
        )}

        {item.edit ? (
          <>
            <ActionButton onClick={() => handleEdit(item)}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3196/3196909.png"
                alt="Edit"
                width={"30rem"}
              />
            </ActionButton>
            <ActionButton onClick={() => handleDeleteProduct(item)}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/8556/8556073.png"
                alt="Delete"
                width={"30rem"}
              />
            </ActionButton>
          </>
        ) : (
          <Button onClick={() => handleSave(item)}>Save</Button>
        )}
      </ButtonContainer>
    </Container>
  );
}
