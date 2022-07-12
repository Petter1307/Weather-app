/* eslint-disable no-restricted-syntax */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext } from 'react';
// import useLocalStorage from '../hooks/useLocalStorage';
import usePersistStorage from '../hooks/usePersistStorage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = usePersistStorage(null, 'user');
  const [locations, setlocations] = usePersistStorage([], 'storage');

  const verifyLocationSave = () => {
    return locations.length === 0;
  };

  const login = emailInput => {
    const newData = authData;
    setAuthData({
      ...newData,
      authed: true,
      email: emailInput,
    });
  };

  const logout = () => {
    const oldData = authData;
    console.log(oldData);
    setAuthData({ ...oldData, authed: false });
  };

  // const setLastLocation = newLocation => {
  //   const oldData = authData;
  //   setAuthData({ ...oldData, lastLocation: newLocation });
  // };

  // const checkDublicats = inputName => {
  // eslint-disable-next-line no-plusplus
  // for (let i = 0; i <= locations.length; i++) {
  //   if (locations[i].hasOwnProperty('name')) {
  //     // const { name } = locations[i];
  //     console.log('name');
  //   }
  // if (name === inputName) {
  //   return true;
  // }
  // }
  //   return false;
  // };

  // const saveLastLocation = ({ lon, lat, name }) => {
  //   console.log('Function called');
  //   if (locations === null) {
  //     setlocations([{ lon, lat, name }]);
  //     console.log('first if executed ');
  //   } else if (checkDublicats({ name }) && locations.length <= 5) {
  //     const newLocations = locations;
  //     newLocations.push({ lon, lat, name });
  //     setlocations(newLocations);
  //     console.log('second if executed');
  //   } else if (checkDublicats({ name }) && locations.length > 5) {
  //     const newLocation = locations.slice(0, -1);
  //     newLocation.push({ lon, lat, name });
  //     setlocations(newLocation);
  //     console.log('Third if executed');
  //   } else {
  //     console.log('All ifs failed');
  //   }
  //   console.log('function ended');
  // };

  const saveLastLocation = ({ lon, lat, name }) => {
    if (locations === null) {
      setlocations([{ lon, lat, name }]);
      console.log('first if executed ');
    } else {
      const newLocations = locations;
      newLocations.push({ lon, lat, name });
      setlocations(newLocations);
    }
  };

  const value = {
    ...authData,
    login,
    logout,
    saveLastLocation,
    locations,
    verifyLocationSave,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
