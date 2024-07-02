import '../design.css'
import {StoreContext} from "../parts/StoreContext.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import equals from "validator/es/lib/equals.js";
import { GetUserCart } from "../parts/getUserCart.jsx";
import {Button, Card, CardContent} from "@mui/material";
import Chat from "../parts/Chat.jsx";

const yourOrder = "Your Order";

function Orders() {
  const [chatUser, setChatUser] = useState({ userName: '', userId: ''});

  const chatHGap = "10";

  return (
    <>
      <div style={ chatUser.userName ? { position: 'absolute', top: '40px', left: `calc(20vw - ${chatHGap}px)` } : {}}>
        <ShowAllCarts chatUser={chatUser} setChatUser={setChatUser}/>
      </div>
      {chatUser.userName && (
        <div style={{ position: 'fixed', top: 0, left: `calc(60vw + ${chatHGap}px)`, height: '100%', width: '50%' }}>
          <Chat chatUser={chatUser}/>
        </div>
      )}
    </>
  );
}

function ShowAllCarts({chatUser, setChatUser}) {
  const {userId, url} = useContext(StoreContext);
  const [carts, setCarts] = useState([]);
  // const [curCart, setCurCart] = useState({ items: [] });

  const curCart = GetUserCart();

  useEffect(() => {
    const getOtherCarts = async () => {
      try {
        const response = await axios.get(url + 'api/cart');
        const cartsWithUserNames = await Promise.all(
          response.data.filter(cart => !equals(cart.user, userId)).map(async cart => {
            const userResponse = await axios.get(url + `api/user/${cart.user}`);
            return { ...cart, user: { userId: cart.user, userName: userResponse.data.name }};
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
    <div style={{paddingTop: '50px', paddingBottom: '10px'}}>
      <h1>Orders Page</h1>
      {userId ? (
        curCart.items.length > 0 ? (
          <div>
            <ShowCart key={userId} cartOwner={yourOrder} cart={curCart} chatUser={chatUser} setChatUser={setChatUser}/>
          </div>
        ) : (
          <div> Your cart is empty. </div>
        )
      ) : (
        <div> Login to view your cart. </div>
      )}
      <h2> Others&apos; Orders: </h2>
      <div>
        {carts.map((cart) => (
          <ShowCart key={cart.user.userId} cartOwner={cart.user.userName} cart={cart} chatUser={chatUser} setChatUser={setChatUser}/>
        ))}
      </div>
    </div>
  )
}

function ShowCart({cartOwner, cart, chatUser, setChatUser}) {
  const {userId} = useContext(StoreContext);

  const groupedItems = cart.items.reduce((groups, item) => {
    const group = groups[item.restaurantName] || [];
    group.push(item);
    groups[item.restaurantName] = group;
    return groups;
  }, {});

  const showChat = (user) => {
    if (!userId) {
      alert('Please sign in to chat.');
      return;
    }
    setChatUser(chatUser.userId===user.userId ?
      { userName: '', userId: ''} :
      { userName: user.userName, userId: user.userId })
  }

  return (
    <Card key={cart._id} sx={{width: '40vw', marginBottom: 2, borderRadius: '10px', paddingX: 0, bgcolor: '#292d36'}}>
      <CardContent>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2 style={{marginTop: 12, marginBottom: -3}}>{cartOwner}</h2>
          {cartOwner !== yourOrder && <Button
            style={{marginRight: 6}}
            variant="contained"
            color="primary"
            onClick={() => { showChat(cart.user)}}>
            Chat
          </Button>}
        </div>
        {Object.entries(groupedItems).map(([restaurantName, items], i, array) => (
          <Card key={restaurantName}
                sx={{marginTop: 2, marginBottom: i === array.length - 1 ? -1 : 2, borderRadius: '10px', paddingY: 0}}
                elevation={1}>
            <CardContent sx={{padding: 0}}>
              <h3 style={{marginTop: 6, marginLeft: 14, textAlign: 'left'}}>{restaurantName}</h3>

              <Card sx={{marginTop: -1.5, marginBottom: -3, borderRadius: '10px', paddingX: 2}} elevation={3}>
                <ul style={{listStyleType: 'none', padding: 0}}>
                  {items.map((item) => (
                    <li key={item.food._id} style={{display: 'flex', justifyContent: 'space-between'}}>
                      <span>{item.food.name}</span>
                      <span>{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

export default Orders
