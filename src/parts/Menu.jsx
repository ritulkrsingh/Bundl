import '../design.css'
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "./StoreContext.jsx";

export default function Menu() {
  const { restaurantName } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const { url, userId } = useContext(StoreContext);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await axios.get(url + 'api/restaurants');
      const restaurants = response.data;
      const foundRestaurant = restaurants.find(r => r.name === restaurantName.split('-').join(' '));
      setRestaurant(foundRestaurant);
    };

    fetchRestaurant();
  }, [url, restaurantName]);

  const addToCart = async (foodItem) => {
    if (!userId) {
      alert('Please sign in to add items to the cart.');
      return;
    }

    try {
      const response = await axios.post(url + 'api/cart', {
        userId: userId,
        food: foodItem,
        restaurantName: restaurant.name,
        quantity: 1
      });

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
          <div key={foodItem._id} onClick={() => addToCart(foodItem)}>
            <h2>
              {foodItem.name}
            </h2>
            <p>{foodItem.description}</p>
            <p>{foodItem.location}</p>
          </div>
        ))}
      </div>
    )
  );
}
