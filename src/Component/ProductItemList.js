// ProductItemList.js
// This component fetches and displays a list of products, allowing users to sort them and view individual product details.

import React from "react";
import ProductItem from "./ProductItem"; // Import ProductItem component for rendering individual products
import { useSelector } from "react-redux"; // Import useSelector hook to access Redux store state
import Sort from "./Sort"; // Import Sort component for sorting product items

/**
 * ProductItemList Component
 * 
 * The ProductItemList component retrieves the list of products from the Redux store,
 * displays a loading spinner if the data is being fetched, and renders each product using
 * the ProductItem component. Additionally, it includes a Sort component for sorting functionality.
 */
export default function ProductItemList() {
  // Access the list of products from the Redux store
  const data = useSelector((state) => state.products);

  // Check if data is still loading or empty
  if (data.length === 0) {
    // Render a loading spinner if no products are available (indicating data fetch)
    return (
      <div className="d-flex justify-content-center mt-5">
        <div
          className="spinner-border"
          style={{ width: "8rem", height: "8rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    // Render the list of products if data is available
    return (
      <div className="d-flex flex-column container-sm mt-4">
        <Sort /> {/* Component to handle sorting functionality */}
        {data.map((item) => (
          <ProductItem item={item} key={item.title} /> // Render each product item
        ))}
      </div>
    );
  }
}
