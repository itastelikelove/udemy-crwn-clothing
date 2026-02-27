import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const subCartItem = (cartItems, productToSub) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToSub.id,
  );

  if (existingCartItem.quantity <= 1) {
    return removeCartItem(cartItems, productToSub);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToSub.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

// the actual context value(s)
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  subtractItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

// the component that defines the scope for the context
export const CartProvider = ({ children }) => {
  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (cartItems) => {
    const newCartCount = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.quantity;
    }, 0);

    const newCartTotal = cartItems.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      }),
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const subtractItemFromCart = (productToSub) => {
    const newCartItems = subCartItem(cartItems, productToSub);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (isCartOpen) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    subtractItemFromCart,
    removeItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
