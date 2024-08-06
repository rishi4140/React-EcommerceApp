import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importing toast styles
import Nav from "./Component/Nav";
import ProductDetail from "./Component/ProductDetail";
import AddProduct from "./Component/AddProduct";
import CartItems from "./Component/CartItems";
import ProductItemList from "./Component/ProductItemList";
import { addproducts } from "./actions/index";
import customFetch from "./apiCall";
import { showToastMessage } from "./Notification/toast"; // Adjust the import path as necessary

/* This code sets up the main application component, which includes different routes using React Router. 
It also fetches data from an API, modifies it, and stores it in local storage. The component renders a navigation bar (Nav),
 and based on the current route,
 it renders different components such as ProductItemList, AddProduct, ProductDetail, or CartItems. */

function App() {
  const productDetailItem = useSelector((state) => state.itemToDisplay);
  const dispatch = useDispatch();

  // Define the API URL for fetching product data
  const url = "https://my-json-server.typicode.com/jaiswalaryan/data/db";

  // Fetch products data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Perform API call to fetch data
        const response = await customFetch(url, {
          method: "GET",
        });

        // Modify the fetched data to include an edit flag
        const modifiedData = response.products.map((item) => {
          return { ...item, edit: true }; // Spread operator to avoid direct mutation
        });

        // Store modified data in local storage
        window.localStorage.setItem("products", JSON.stringify(modifiedData));

        // Retrieve products from local storage
        const products = JSON.parse(window.localStorage.getItem("products"));

        // Dispatch action to add products to the Redux store
        dispatch(addproducts(products));
      } catch (error) {
        console.error("Error fetching products data:", error);
        // Show an error toast notification in case of an API call failure
        showToastMessage("Failed to fetch products data", "error");
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<ProductItemList />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route
            path={`/productdetails/${productDetailItem.id}`}
            element={<ProductDetail item={productDetailItem} />}
          />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
        {/* ToastContainer for displaying toast notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
