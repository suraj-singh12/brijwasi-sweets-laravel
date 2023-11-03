import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from "../axios-client.js";
import Header from './Header.jsx';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';

export default function DefaultLayout() {
  const { user, setUser, token, setToken, notification } = useStateContext();

  if (!token) {
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
      .then(({ data }) => {
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

  const options = {
    loop: true,
    margin: 2,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 3000,
    items: 1,
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
  }

  return (
    <div id="defaultLayout">

      <div className="content">
        <Header />
        <main>
          <OwlCarousel style={{width: "95vw", margin: 'auto'}} className='owl-theme' {...options} nav>
            <div class='item' style={{width: "90%", border: "1px solid black", textAlign: 'center', margin: 'auto'}}>
              <h4>1</h4>
            </div>
            <div class='item'>
              <h4>2</h4>
            </div>
            <div class='item'>
              <h4>3</h4>
            </div>
            <div class='item'>
              <h4>4</h4>
            </div>
            <div class='item'>
              <h4>5</h4>
            </div>
            <div class='item'>
              <h4>6</h4>
            </div>
            <div class='item'>
              <h4>7</h4>
            </div>
            <div class='item'>
              <h4>8</h4>
            </div>
            <div class='item'>
              <h4>9</h4>
            </div>
            <div class='item'>
              <h4>10</h4>
            </div>
            <div class='item'>
              <h4>11</h4>
            </div>
            <div class='item'>
              <h4>12</h4>
            </div>
          </OwlCarousel>
          <Outlet />
        </main>
      </div>
      {notification &&
        <div className="notification">
          {notification}
        </div>
      }
    </div>
  )
}
