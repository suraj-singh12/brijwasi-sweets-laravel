import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(
        localStorage.getItem('ACCESS_TOKEN')
        );

    const setToken = (token) => {
        _setToken(token);
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        }
        else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('');
        }, 5000);
    }
    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

/**
 * StateContext is exported so that it can be used by components to access the context
 *
 * ContextProvider is exported as a component that wraps the whole application & provides the context's values & functions
 * to the component within the application.
 * It accepts the children prop to render the child components
 */
