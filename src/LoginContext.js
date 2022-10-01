import * as React from 'react'

const LoginContext = React.createContext({
    isLogin: false, 
    setLogin: () => {}
});

export default LoginContext;