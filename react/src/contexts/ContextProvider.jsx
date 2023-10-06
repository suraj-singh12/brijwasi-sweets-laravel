import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({
        name: 'Jack'
    });
    const [token, _setToken] = useState(
        localStorage.getItem('ACCESS_TOKEN')
        );

    const setToken = (token) => {
        _setToken(token);
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
            console.log('here settingToken')
        }
        else {
            localStorage.removeItem('ACCESS_TOKEN');
            console.log('erasing token');
        }
    }
    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
