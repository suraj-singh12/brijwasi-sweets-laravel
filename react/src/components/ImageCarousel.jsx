import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
export default function ImageCarousel({ images }) {
  console.log('received: ', images);
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  return (
    <Carousel>
      {images.map((image, index) => {
        if(image.image === '/public/images/logo.png') return null;
        return (
          <Carousel.Item key={index}>
            <img src={apiBaseUrl + image.image} alt={image.name} text={image.name} style={{ width: '100%', height: '400px' }} />
            <Carousel.Caption>
              <h3>{image.name}</h3>
              <p>Enjoy Delicious Brijwasi Sweets At Home</p>
            </Carousel.Caption>
          </Carousel.Item>
        )}
      )}
    </Carousel>
  );
}
