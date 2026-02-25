import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const { viewCart, setViewCart, cartItems, cartCount } =
    useContext(CartContext);

  const toggleViewCart = () => {
    setViewCart(!viewCart);
  };

  return (
    <CartIconContainer onClick={toggleViewCart}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
