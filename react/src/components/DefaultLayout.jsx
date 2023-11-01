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

  const styles = {
    icon: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: 'white',
      padding: '10px',
      backgroundColor: '#325ca8',
      borderRadius: '10px',
      margin: '10px'
    },
    button: {
      margin: '10px',
      backgroundColor: '#bfe369',
      borderRadius: '10px',
      padding: '10px',
    }
  }


  return (
    <div id="defaultLayout">
        {/*<aside>*/}
            {/*<Link to="/dashboard">Dashboard</Link>*/}
            {/*<Link to="/users">Users</Link>*/}
        {/*</aside>*/}
        <div className="content">
            <header>
                <div style={styles.icon}>
                    Brijwasi Sweets
                </div>
                <div>
                  <span style={styles.button}>Hii, {user.name}</span>
                  <a href="#" className="btn-logout" onClick={onLogout}>Logout</a>
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
