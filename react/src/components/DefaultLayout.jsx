import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from "../axios-client.js";
import Header from './Header.jsx';
import axios from 'axios';

import ImageCarousel from './ImageCarousel.jsx';
import DisplayProducts from './DisplayProducts.jsx';



export default function DefaultLayout() {
  const { user, setUser, token, setToken, notification } = useStateContext();
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [types, setTypes] = useState([]);
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
    axiosClient.get(apiBaseUrl + '/products/name/Brijwasi')
    .then(({data}) => {
      console.log('banner data: ', data);
      setBanners(data);
    })
  }, []);


  useEffect(() => {
    axiosClient.get(apiBaseUrl + '/products/uniqueTypeValues')
    .then(({data}) => {
      console.log('unique type values / products: ', data);
      setProducts(data);
    })
  }, [])
  // useEffect(() => {
  //   axiosClient.get(baseUrl + '/products/types')
  //     .then(({ data: types }) => {
  //       const requests = types.map((type) => {
  //         return axiosClient.get(baseUrl + `/products/${type}`)
  //           .then((resp) => resp.data); // Extract the data from the response
  //       });

  //       return Promise.all(requests);
  //     })
  //     .then((data) => {
  //       console.log('products final: ', data);
  //       setProducts(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching products:', error);
  //     });
  // }, []);

  return (
    <div id="defaultLayout">
      <div className="content">
        <Header />
        <main>
          <ImageCarousel images={banners} />
          <DisplayProducts products={products} />
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
