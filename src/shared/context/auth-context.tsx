import { createContext } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
