import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Quantity,
  Arrow,
  Value,
  Price,
  RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ checkoutItem }) => {
  const { addItemToCart, subtractItemFromCart, removeItemFromCart } =
    useContext(CartContext);
  if (!checkoutItem) return null;
  const { name, imageUrl, quantity, price } = checkoutItem;

  const handleAdd = () => addItemToCart(checkoutItem);
  const handleSubtract = () => subtractItemFromCart(checkoutItem);
  const handleRemove = () => removeItemFromCart(checkoutItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={handleSubtract}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={handleAdd}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={handleRemove}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
