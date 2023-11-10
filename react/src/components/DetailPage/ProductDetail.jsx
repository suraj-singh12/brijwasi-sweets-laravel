import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Header from '../Header';
import { useStateContext } from '../../contexts/ContextProvider';
import Footer from '../Footer';
// owl carousel
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { user, setUser, token, setToken, notification } = useStateContext();
  const i = useLocation().state.product;
  const [item, setItem] = useState(i);
  const [products, setProducts] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_URL;


  // get user info on component mounting
  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      })
  }, [])


  useEffect(() => {
    if (item && item.id) {
      axiosClient.get(apiBaseUrl + '/products/' + item.type)
        .then(({ data }) => {
          setProducts(data);
        })
        .catch(err => {
          console.log('error :-|');
        })
    }
  }, [])

  const handleClick = (product) => {
    setItem(product);
  }

  return (
    item && <div className="mainProduct">
      <Header />
      <div className="main">
        {item &&
          <div className={styles.left}>
            <div className={styles.itemImage}>
              <img src={apiBaseUrl + item.image} alt={`${item.image}`} style={{ width: '100%', height: '250px' }} preload={'auto'} />
            </div>
            <div className={styles.itemInfo}>
              <p style={{ textTransform: 'capitalize' }}> ~ {item.name} ~</p>
              <button className={styles.button}>Buy Now</button>
            </div>
          </div>
        }
      </div>
      <div className={styles.side}>
        <OwlCarousel loop autoplay autoplayTimeout={1500} autoplayHoverPause margin={1} items={4} dotsContainer="true" navContainer="true" nav>
          {products && products.map((product) => {
            return (
              <div className={styles.product} key={product.id} onClick={() => { handleClick(product) }}>
                <div className={styles.productImage}>
                  <img src={apiBaseUrl + product.image} alt={`${product.image}`} style={{ width: '100%', height: '250px' }} preload={'auto'} />
                </div>
                <div className={`productInfo ${styles.productInfo}`}>
                  <h4 style={{ textTransform: 'capitalize' }}>{product.name}</h4>
                </div>
              </div>
            )
          })}
        </OwlCarousel>
      </div>
      <Footer />
    </div>
  )
}
