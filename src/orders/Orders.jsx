import '../design.css'
import {StoreContext} from "../parts/StoreContext.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import equals from "validator/es/lib/equals.js";

function Orders() {
  const { userId,  userName, url  } = useContext(StoreContext);
  const [carts, setCarts] = useState([]);
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

  useEffect(() => {
    const getOtherCarts = async () => {
      try {
        const response = await axios.get(url + 'api/cart');
        const cartsWithUserNames = await Promise.all(
          response.data.filter(cart => !equals(cart.user, userId)).map(async cart => {
            const userResponse = await axios.get(url + `api/user/${cart.user}`);
            return { ...cart, user: userResponse.data.name };
          })
        );
        setCarts(cartsWithUserNames);
        console.log("Other Carts Loaded", cartsWithUserNames);
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    };
    getOtherCarts();
  }, [url, userId]);


  return (
    <>
      <div>
        <h1>Orders Page</h1>
        {userId ? (
          curCart.items.length > 0 ? (
            <div>
              <ShowCart cartOwner='Your Order:' cart={curCart}/>
            </div>
          ) : (
            <div> Your cart is empty. </div>
          )
        ) : (
          <div> Login to view your cart. </div>
        )}
        Others' Orders:
        <div>
          {carts.map((cart) => (
            <div key={cart._id}>
              <ShowCart cartOwner={cart.user} cart={cart}/>
            </div>
          ))}
        </div>
        <a href={`/../`}>Go Back</a>
      </div>
    </>
  )
}

function ShowCart({ cartOwner, cart }) {
  const groupedItems = cart.items.reduce((groups, item) => {
    const group = groups[item.restaurantName] || [];
    group.push(item);
    groups[item.restaurantName] = group;
    return groups;
  }, {});

  return (

    <div>
      <h2>{cartOwner}</h2>
      {Object.entries(groupedItems).map(([restaurantName, items]) => (
        <div key={restaurantName}>
          <h3>{restaurantName}</h3>
          <ul>
            {items.map((item) => (
              <li key={item.food._id}>
                {item.food.name}: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders
