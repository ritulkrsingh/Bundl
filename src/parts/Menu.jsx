import '../design.css'
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "./StoreContext.jsx";
import {Button, Card, CardContent, Grid, IconButton, Typography} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import {GetUserCart} from "./getUserCart.jsx";

export default function Menu() {
  const { restaurantName } = useParams();
  const { url, userId } = useContext(StoreContext);
  const [restaurant, setRestaurant] = useState(null);
  const [curCart, setCurCart] = useState(GetUserCart());

  const tempCurCart = GetUserCart();

  useEffect(() => {
    setCurCart(tempCurCart);
  }, [tempCurCart]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await axios.get(url + 'api/restaurants');
      const restaurants = response.data;
      const foundRestaurant = restaurants.find(r => r.name === restaurantName.split('-').join(' '));
      setRestaurant(foundRestaurant);
    };
    fetchRestaurant();
  }, [url, restaurantName]);

  useEffect(() => {
    // quantity changed
  }, [curCart]);

  const addToCart = async (foodItem, amount) => {
    if (!userId) {
      alert('Please sign in to add items to the cart.');
      return;
    }

    try {
      const response = await axios.post(url + 'api/cart', {
        userId: userId,
        food: foodItem,
        restaurantName: restaurant.name,
        quantity: amount
      });

      setCurCart(response.data);

      console.log(response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }

  };

  return (
    restaurant && (
      <div>
        <h1>{restaurant.name}</h1>
        {restaurant.menu.map((foodItem) => (
          <Card key={foodItem._id} sx={{ width: '40vw', marginBottom: 2, borderRadius: '10px', paddingX: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={8} container direction="column" alignItems="flex-start">
                  <Typography variant="h5" component="div">
                    {foodItem.name}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ marginRight: -6, fontSize: '1rem' }}>
                    ${foodItem.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {foodItem.description}
                  </Typography>
                </Grid>
                <Grid item xs={4} container justifyContent="center" alignItems="center">
                  <IconButton
                    color="primary"
                    sx={{ fontSize: '0.8rem' }}
                    onClick={() => addToCart(foodItem, -1)}>
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ margin: '0 2px', fontSize: '1rem' }}>
                    {curCart.items.find(item => item.food._id === foodItem._id)?.quantity || 0}
                  </Typography>
                  <IconButton
                    color="primary"
                    sx={{ fontSize: '0.8rem' }}
                    onClick={() => addToCart(foodItem, 1)}>
                    <Add fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  );
}