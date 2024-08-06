import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addproducts } from "../actions";

// This is used to sort the products according to their prices in ascending order
export default function Sort() {
  const [flag, setFlag] = useState(false);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  function handleSort() {
    let sortedData = products.sort((a, b) => a.price - b.price);
    dispatch(addproducts([...sortedData]));
    setFlag(true);
  }

  function cancelSort() {
    let products = JSON.parse(window.localStorage.getItem("products"));
    dispatch(addproducts([...products]));
    setFlag(false);
  }

  return (
    <div className="sort-container align-self-end" style={style.sortContainer}>
      <div
        className="bg-white p-2 rounded-5 d-flex justify-content-around"
        style={style.sortButton}
      >
        <span className="fw-bold" onClick={() => handleSort()}>
          Sort by Price
        </span>
        {flag && (
          <span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/561/561189.png"
              alt="cancel"
              width={"20rem"}
              onClick={() => cancelSort()}
              style={{ cursor: "pointer" }}
            />
          </span>
        )}
      </div>
    </div>
  );
}

const style = {
  sortContainer: {
    marginBottom: "20px", // Add space below the sort button
    marginTop: "10px", // Optional: Add space above the sort button
  },
  sortButton: {
    width: "9rem",
    cursor: "pointer",
  },
};
