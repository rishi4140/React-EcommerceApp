import {
  Add_products,
  Add_cart,
  Product_view,
  Cart_items,
  update_cart,
  delete_cart
} from "../actions";

/*The code defines a Redux reducer function for managing the state related to products and cart items. The initial state includes
 empty arrays for products and cart, an empty string for the item to display, and the total number of items in the cart set to 0. 
 The reducer handles different action types such as adding products, adding items to the cart, updating the cart, deleting items from 
 the cart, and setting the item to display. The reducer updates the state based on the action type and returns the updated state. */


let initialState = {
  products: [],
  cart: [],
  itemToDisplay: "",
  totalCart: 0,
};
export default function products(state = initialState, actions) {
  switch (actions.type) {
    case Add_products:
      return {
        ...state,
        products: actions.products,
      };
    case Add_cart:
      let flag = state.cart.indexOf(actions.cart);
      if (flag!==-1) {
        actions.cart.qty += 1;
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          cart: [actions.cart, ...state.cart],
        };
      }

    case Product_view:
      return {
        ...state,
        itemToDisplay: actions.view,
      };
    case Cart_items:
      let { cart } = state;
      let total = cart.reduce((total, item) => {
        return (total += item.qty);
      }, 0);
      return {
        ...state,
        totalCart: total,
      };
    case update_cart:
      let index = state.cart.indexOf(actions.updatedItem);
      let updatedCart = null;
      if (index !== -1) {
        state.cart[index] = actions.updatedItem;
        updatedCart = state.cart;
      }
      return {
        ...state,
        cart: [...updatedCart],
      };
    case delete_cart:
      let position = state.cart.indexOf(actions.item);
      state.cart.splice(position, 1);
      return {
        ...state,
      }
    default:
      return state;
  }
}
