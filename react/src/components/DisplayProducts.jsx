import React, {useState, useEffect} from 'react';
import axiosClient from '../axios-client';

export default function DisplayProducts({products}) {
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="products">
      {products && products.map((product) => {
        return (
          <div className="product" key={product.id}>
            <div className="productImage">
              <img src={apiBaseUrl + product.image} alt={`${product.image}`} />
            </div>
            <div className="productInfo">
              <h3>{product.name}</h3>
          </div>
          </div>
        )
      })}
    </div>
  );
}
