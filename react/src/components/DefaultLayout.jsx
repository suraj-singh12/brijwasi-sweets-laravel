import React, {useEffect} from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
  const {user, setUser, token, setToken, notification} = useStateContext();

  if(!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      })
  }


  // get user info on component mounting
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data);
      })
  }, [])

  return (
    <div id="defaultLayout">
        <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
        </aside>
        <div className="content">
            <header>
                <div>
                    Header
                </div>
                <div>
                    {user.name}
                    <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                </div>
            </header>
            <main>
              <Outlet />
            </main>
        </div>
      { notification &&
        <div className="notification">
          {notification}
        </div>
      }
    </div>
  )
}
