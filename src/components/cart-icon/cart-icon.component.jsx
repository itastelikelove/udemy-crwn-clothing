import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItems, cartCount } =
    useContext(CartContext);

  const toggleViewCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={toggleViewCart}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
