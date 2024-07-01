import {useContext, useEffect, useState} from 'react'
import '../design.css'
import { Link, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import Menu from "../parts/Menu.jsx";
import {StoreContext} from "../parts/StoreContext.jsx";

function Home() {
  return (
    <>
      <h1>Homepage</h1>
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
      console.log("api/restaurants got", response.data);
    };

    fetchRestaurants();
  }, [url]);

  return (
    <div>
      {restaurants ? restaurants.map((restaurant) => (
        <div key={restaurant._id}>
          <h2>
            <Link to={`/browse/${restaurant.name.split(' ').join('-')}`}>
              {restaurant.name}
            </Link>
          </h2>
          <p>{restaurant.location}</p>
        </div>
      )) : <p>No restaurants found</p>}
    </div>
  );
};

export default Home