import { useDispatch, useSelector } from "react-redux";

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
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  subtractItemFromCart,
} from "../../store/cart/cart.action";

const CheckoutItem = ({ checkoutItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  if (!checkoutItem) return null;
  const { name, imageUrl, quantity, price } = checkoutItem;

  const handleAdd = () => dispatch(addItemToCart(cartItems, checkoutItem));
  const handleSubtract = () =>
    dispatch(subtractItemFromCart(cartItems, checkoutItem));
  const handleRemove = () =>
    dispatch(removeItemFromCart(cartItems, checkoutItem));

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
