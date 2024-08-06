// Nav.js
// This component renders the navigation bar for the application, providing links to different pages and displaying the cart count.

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./Nav.css"; // Import custom CSS for additional styling

/**
 * Nav Component
 * 
 * The Nav component renders a responsive navigation bar that includes links to the Products
 * and Add Product pages, as well as icons for the user profile and cart. The component also
 * displays the total number of items in the cart, sourced from the Redux store.
 */
export default function Nav() {
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  // Access the total number of items in the cart from the Redux store
  const total = useSelector((state) => state.totalCart);

  return (
    <nav className="navbar navbar-expand-lg p-3 align-items-center" style={style.nav}>
      <div className="container-fluid">
        {/* Brand Logo and Name */}
        <a className="navbar-brand fs-3" href="#!" style={style.navHead}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833300.png"
            alt="logo"
            width="30rem"
            className="me-2"
          />
          Shopify
        </a>

        {/* Toggle button for collapsing navbar content on smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Link to Products Page */}
            <li className="nav-item">
              <Link to="/" className="nav-link text-light" style={style.navLink}>
                Products
              </Link>
            </li>
            {/* Link to Add Product Page */}
            <li className="nav-item">
              <Link to="/addproducts" className="nav-link text-light" style={style.navLink}>
                Add a Product
              </Link>
            </li>
          </ul>

          {/* Icons for Cart and Profile */}
          <div className="d-flex gap-3 position-relative align-items-center">
            {/* Cart Icon with Badge showing Total Items in Cart */}
            <div className="icon-wrapper" onClick={() => navigate("/cart")}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png"
                alt="cart"
                width={"30rem"}
                style={style.icon}
                title="View Cart"
              />
              {total ? (
                <span
                  className="badge rounded-circle position-absolute d-flex align-items-center justify-content-center"
                  style={style.cartBadge}
                >
                  {total}
                </span>
              ) : null}
            </div>
            {/* User Profile Icon */}
            <div className="icon-wrapper">
              <img
                src="https://cdn-icons-png.flaticon.com/512/236/236832.png"
                alt="profile"
                width={"30rem"}
                style={style.icon}
                title="User Profile"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Inline styles for various elements within the Navbar
const style = {
  nav: {
    backgroundImage: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", // Gradient background for navbar
  },
  navHead: {
    fontFamily: "var(--fontStyle)",
    color: "#fff", // White text for better contrast against the background
    display: "flex",
    alignItems: "center",
  },
  navLink: {
    fontSize: "1.1rem", // Slightly larger font size for links
    transition: "color 0.3s ease", // Smooth transition effect for link colors
    marginRight: "1rem", // Margin between links
  },
  icon: {
    cursor: "pointer", // Pointer cursor to indicate clickable icons
    transition: "transform 0.3s ease, opacity 0.3s ease", // Smooth transition for hover effects
  },
  cartBadge: {
    width: "1.5rem", // Size of the badge displaying cart count
    height: "1.5rem",
    top: "5px", // Positioning relative to cart icon
    left: "18px",
    backgroundColor: "#ff6f61", // Color for the badge background
    color: "#fff", // Color for the badge text
    fontSize: "0.8rem", // Font size for the cart count
  },
};
