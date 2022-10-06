import * as React from 'react'

const LoginContext = React.createContext({
    isLogin: false, 
    userToken: "",
    setLogin: () => {},
    setToken: () => {}
});

export default LoginContext;