import React, { useContext } from 'react';


const AuthContext = React.createContext({
    user: null,
    setUser: () => {}
});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;