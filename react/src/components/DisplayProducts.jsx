import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import styles from './DisplayProduct.module.css';
import { useNavigate }  from 'react-router-dom';

export default function DisplayProducts({ products, withName }) {
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();

  const handleClick = (product) => {
    navigateTo('/productDetail', {state: {product}});
  }

  if (!withName) {
    return (
      <div className={`${styles.products} container`}>
        {products && products.map((product) => {
          let productType = product.type.split('-').join(' ');
          if (productType.toLowerCase() == 'home page') productType = product.name;
          return (
            <div className={styles.product} key={product.id} onClick={() => handleClick(product)}>
              <div className="productImage" style={{ width: '100%' }}>
                <img src={apiBaseUrl + product.image} alt={`${product.image}`} style={{ width: '100%', height: '250px' }} preload={'auto'}/>
              </div>
              <div className={`productInfo ${styles.productInfo}`}>
                <h4 style={{ textTransform: 'capitalize' }}>{productType}</h4>
              </div>
            </div>
          )
        })}
      </div>
    );
  } else {
    return (
      <div className={`${styles.products2} container`}>
        {products && products.map((product) => {
          return (
            <div className={styles.product2} key={product.id} onClick={() => {handleClick(product)}}>
              <div className={styles.productImage2}>
                <img src={apiBaseUrl + product.image} alt={`${product.image}`} style={{ width: '100%', height: '250px' }} preload={'auto'}/>
              </div>
              <div className={`productInfo ${styles.productInfo}`}>
                <h4 style={{ textTransform: 'capitalize' }}>{product.name}</h4>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
