import { createContext, useEffect, useState } from "react";

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

  if (existingCartItem && existingCartItem.quantity <= 1) {
    return removeCartItem(cartItems, productToSub);
  }

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToSub.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem,
    );
  }

  return [...cartItems];
};

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

// the actual context value(s)
export const CartContext = createContext({
  viewCart: false,
  setViewCart: () => {},
  hideCart: () => {},
  cartItems: [],
  addItemToCart: () => {},
  subtractItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

// the component that defines the scope for the context
export const CartProvider = ({ children }) => {
  const [viewCart, setViewCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.quantity;
    }, 0);

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    setCartTotal(newCartTotal);
  }, [cartItems]);

  const hideCart = () => {
    setViewCart(false);
  };

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const subtractItemFromCart = (productToSub) => {
    setCartItems(subCartItem(cartItems, productToSub));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const value = {
    viewCart,
    setViewCart,
    hideCart,
    cartItems,
    addItemToCart,
    subtractItemFromCart,
    removeItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
