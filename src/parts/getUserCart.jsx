import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "./StoreContext.jsx";

export const GetUserCart = () => {
  const { userId, url } = useContext(StoreContext);
  const [curCart, setCurCart] = useState({ items: [] });

  useEffect(() => {
    const fetchCurCart = async () => {
      try {
        const response = await axios.get(url + `api/cart/${userId}`);
        setCurCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    if (userId) {
      fetchCurCart();
    } else {
      setCurCart({ items: [] });
    }
  }, [url, userId]);

  return curCart;
};