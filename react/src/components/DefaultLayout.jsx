import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from "../axios-client.js";
import Header from './Header.jsx';
import axios from 'axios';

import ImageCarousel from './ImageCarousel.jsx';


export default function DefaultLayout() {
  const { user, setUser, token, setToken, notification } = useStateContext();
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
    axiosClient.get(baseUrl + '/api/products/')
      .then(({ data }) => {
        setProducts(data);
        console.log("products: ", data);
        return data;
      })
      .then((data) => {
        const banners = data.filter((item) => (item.name === 'Brijwasi'));
        setBanners(banners);
        console.log("banners: ", banners);
      });
  }, []);


  return (
    <div id="defaultLayout">
      <div className="content">
        <Header />
        <main>
          <ImageCarousel images={banners} />

          {/* <Outlet /> */}
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
