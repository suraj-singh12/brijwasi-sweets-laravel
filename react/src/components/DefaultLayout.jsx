import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from "../axios-client.js";
import Header from './Header.jsx';
import axios from 'axios';

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function DefaultLayout() {
  const { user, setUser, token, setToken, notification } = useStateContext();
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

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
    axios.get('http://127.0.0.1:8000/api/products/')
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
      <div className="content">
        <Header />
        <main>
          <Carousel>
            <Carousel.Item>
              <img src="/public/images/milk_cake.png" text="First slide" style={{width: 'auto', height: '200px'}} />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src="/public/images/kesar.jpg" text="Second slide" />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src="/public/images/soan_papdi.png" text="Third slide" />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

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
