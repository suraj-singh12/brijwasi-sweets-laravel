import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from "../axios-client.js";
import Header from './Header.jsx';
import axios from 'axios';

import ImageCarousel from './ImageCarousel.jsx';
import DisplayProducts from './DisplayProducts.jsx';
import Footer from './Footer.jsx';



export default function DefaultLayout() {
  const { user, setUser, token, setToken, notification } = useStateContext();
  const [banners, setBanners] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    axios.get(apiBaseUrl + '/products/name/Brijwasi')
    .then(({data}) => {
      console.log('banner data: ', data);
      setBanners(data);
    })
  }, []);

  return (
    <div id="defaultLayout">
      <div className="content">
        <Header />
        <main>
          <ImageCarousel images={banners} />
          <Outlet />
        </main>
        <Footer />
      </div>
      {notification &&
        <div className="notification">
          {notification}
        </div>
      }
    </div>
  )
}
