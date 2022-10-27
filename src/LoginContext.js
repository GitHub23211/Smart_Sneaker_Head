import * as React from 'react'

const LoginContext = React.createContext({
    isLogin: false, 
    userToken: "",
    loginType:"",
    setLogin: () => {},
    setToken: () => {},
    setLoginType: () => {}

});

export default LoginContext;