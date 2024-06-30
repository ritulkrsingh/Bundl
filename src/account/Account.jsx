import { useContext } from 'react';
import { StoreContext } from '../parts/StoreContext.jsx';
import { useNavigate } from 'react-router-dom';

function Account() {
  const { setToken, setUserId } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    setUserId('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <>
      <h1>Account Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <a href={`/../`}>Go Back</a>
    </>
  );
}

export default Account;