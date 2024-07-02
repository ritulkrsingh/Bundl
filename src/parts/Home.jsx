import {useContext, useEffect, useState} from 'react'
import '../design.css'
import { Link, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import Menu from "./Menu.jsx";
import {StoreContext} from "./StoreContext.jsx";
import {Card, CardContent, Typography} from "@mui/material";

function Home() {
  return (
    <>
      <Routes>
        <Route path="/browse/:restaurantName" element={<Menu />} />
        <Route path="/" element={<RestaurantList />} />
      </Routes>
    </>
  )
}

const RestaurantList = () => {
  const { url  } = useContext(StoreContext);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axios.get(url + 'api/restaurants');
      setRestaurants(response.data ? response.data : []);
      console.log(url + "api/restaurants got", response.data);
    };

    fetchRestaurants();
  }, [url]);

  return (
    <div>
      <h1>List of restaurants</h1>
      {restaurants ? restaurants.map((restaurant) => (
        <Card key={restaurant._id} sx={{ maxWidth: '50vw', width: '40vw', marginBottom: 1.5, borderRadius: '10px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              <Link to={`/browse/${restaurant.name.split(' ').join('-')}`}>
                {restaurant.name}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {restaurant.location}
            </Typography>
          </CardContent>
        </Card>
      )) : <p>Error loading restaurants...</p>}
    </div>
  );
};

export default Home