import { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';

const useAuth = () => useContext(AuthContext);

export default useAuth;
