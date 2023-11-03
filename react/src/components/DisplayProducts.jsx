import React, {useState, useEffect} from 'react';
import axiosClient from '../axios-client';
import styles from './DisplayProduct.module.css';

export default function DisplayProducts({products}) {
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  return (
    <div className={`${styles.products} container`}>
      {products && products.map((product) => {
        let productType = product.type.split('-').join(' ');
        if(productType.toLowerCase() == 'home page') productType = product.name;
        return (
          <div className={styles.product} key={product.id}>
            <div className="productImage" style={{width: '100%'}}>
              <img src={apiBaseUrl + product.image} alt={`${product.image}`} style={{width: '100%', height: '250px'}} />
            </div>
            <div className={`productInfo ${styles.productInfo}`}>
              <h4 style={{textTransform: 'capitalize'}}>{productType}</h4>
          </div>
          </div>
        )
      })}
    </div>
  );
}
