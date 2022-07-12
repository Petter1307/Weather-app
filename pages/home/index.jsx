/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useCallback, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Weatherpage from '../weather';

const Login = ({ submit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    submit(data.get('email'));
    console.log(data.get('email'));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input name="email" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

const Home = () => {
  const { authed, login, logout } = useAuth();
  const [authState, setAuthState] = useState();
  useEffect(() => setAuthState(authed), []);
  const handleSubmit = useCallback(emailInput => {
    login(emailInput);
    setAuthState(true);
  }, []);

  return (
    <>
      <h1> This is the Home page</h1>

      {!authState ? (
        <Login submit={handleSubmit} />
      ) : (
        <>
          <h2>THis is shown when authstate is true xd</h2>
          <button
            type="submit"
            onClick={() => {
              logout();
              setAuthState(false);
            }}
          >
            Logout
          </button>
          <hr />
          <Weatherpage />
        </>
      )}
    </>
  );
};

export default Home;
