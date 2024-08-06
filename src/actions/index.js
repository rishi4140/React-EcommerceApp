export const Add_products = "Add_products";
export const Add_cart = "Add_cart";
export const Product_view = "product_view";
export const Cart_items = "Cart_items";
export const update_cart = "update_cart";
export const delete_cart = "delete_cart";

/*addproducts(products): Returns an action object with the type Add_products and the provided products data.

addCart(cart): Returns an action object with the type Add_cart and the provided cart data.

ProductToview(item): Returns an action object with the type Product_view and the provided item data.

CartItems(): Returns an action object with the type Cart_items.

updateCart(item): Returns an action object with the type update_cart and the provided item data.

DeleteCart(item): Returns an action object with the type delete_cart and the provided item data. */
export function addproducts(products) {
  return {
    type: Add_products,
    products,
  };
}
export function addCart(cart) {
  return {
    type: Add_cart,
    cart,
  };
}
export function ProductToview(item) {
  return {
    type: Product_view,
    view: item,
  };
}
export function CartItems() {
  return {
    type: Cart_items,
  };
}
export function updateCart(item) {
  return {
    type: update_cart,
    updatedItem: item,
  };
}
export function DeleteCart(item) {
  return {
    type: delete_cart,
    item,
  };
}
