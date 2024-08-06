import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import customFetch from "../apiCall";
import { addproducts } from "../actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from "../Notification/toast";

// Styled component for form container
const Container = styled.div`
  width: 50%;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 976px) {
    width: 90%;
  }

  @media only screen and (max-width: 576px) {
    width: 100%;
    margin: 0;
    padding: 15px;
  }
`;

// Styled component for input fields
const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Styled component for submit button
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
  align-self: flex-end;

  &:hover {
    background-color: #e64a19;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

/**
 * AddProduct Component
 * 
 * This component renders a form that allows users to add a new product.
 * It uses styled-components for styling, React hooks for state management,
 * and Redux for dispatching actions to update the product list.
 */
export default function AddProduct() {
  const products = useSelector((state) => state.products); // Access the products state from Redux store
  const dispatch = useDispatch(); // Initialize Redux dispatch function
  const navigate = useNavigate(); // Hook for programmatic navigation

  // State hooks for form fields and loading state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const url = "https://my-json-server.typicode.com/jaiswalaryan/data/products"; // API endpoint

  /**
   * Validates input fields and returns an object containing error messages.
   */
  const validateInputs = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!price || isNaN(price)) newErrors.price = "Valid price is required";
    if (!category) newErrors.category = "Category is required";
    if (!thumbnail) newErrors.thumbnail = "Thumbnail URL is required";
    if (!rating || isNaN(rating) || rating < 0 || rating > 5) {
      newErrors.rating = "Rating must be a number between 0 and 5";
    }

    return newErrors;
  };

  /**
   * Handles form submission by validating inputs,
   * making a POST request to add a new product, and updating the Redux store.
   * 
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const newErrors = validateInputs(); // Validate inputs

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Update errors state if validation fails
      return;
    }

    setLoading(true); // Set loading state to true while fetching

    try {
      const result = await customFetch(url, {
        body: {
          id: Date.now(),
          title: name,
          price,
          category,
          thumbnail,
          rating,
          description,
          edit: true,
        },
        method: "POST",
      });

      dispatch(addproducts([result, ...products])); // Update Redux store with new product
      showToastMessage("Product added successfully", "success"); // Show success toast
      navigate("/"); // Navigate to the home page
    } catch (error) {
      showToastMessage("Failed to add product", "error"); // Show error toast
    } finally {
      setLoading(false); // Reset loading state
    }

    // Reset form fields and error state
    setName("");
    setCategory("");
    setDescription("");
    setRating("");
    setThumbnail("");
    setPrice("");
    setErrors({});
  };

  return (
    <Container>
      <ToastContainer />
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}

        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <small style={{ color: "red" }}>{errors.description}</small>}

        <Input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <small style={{ color: "red" }}>{errors.price}</small>}

        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {errors.category && <small style={{ color: "red" }}>{errors.category}</small>}

        <Input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        {errors.thumbnail && <small style={{ color: "red" }}>{errors.thumbnail}</small>}

        <Input
          type="text"
          placeholder="Rating (0 to 5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        {errors.rating && <small style={{ color: "red" }}>{errors.rating}</small>}

        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    </Container>
  );
}
