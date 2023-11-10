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
import { useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { user, setUser, notification, setNotification } = useStateContext();
  const i = useLocation().state.product;
  const [item, setItem] = useState(i);
  const [products, setProducts] = useState([]);
  const [bag, setBag] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const navigateTo = useNavigate();


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

  const handleBag = (item) => {
    setNotification(`"${item.name}" added to bag`);
    
    setBag([...bag, item]);
  }

  const handleBuy = () => {
    localStorage.setItem('bag', JSON.stringify(bag));
    setNotification(`"${item.name}" added to bag`);
    setTimeout(() => {
      setNotification('Redirecting to checkout page...');
    }, 1000);
    setTimeout(() => {
      navigateTo('/checkout');
    }, 3000)
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
              <p style={{ textTransform: 'capitalize', marginBottom: '0' }}> ~ {item.name} ~ </p>
              <p style={{ fontSize: '1rem', textAlign: 'center', marginTop: '0'}}>[ &#8377; 459 ]</p>
              <button className={styles.button} onClick={() => handleBag(item)}>Add to Bag</button>
              <button className={styles.button} onClick={handleBuy}>Buy Now</button>
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
        {notification &&
        <div className="notification">
          {notification}
        </div>}
      </div>
      <Footer />
    </div>
  )
}
