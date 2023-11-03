import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import styles from './OurProducts.module.css';
import Heading from '../views/Heading';


export default function OurProducts() {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('combos');
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axiosClient.get(apiBaseUrl + '/products/types')
    .then(({data}) => {
      console.log('OurProducts: ', data);
      setTypes(data);
    });
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.selectable');
    elements.forEach((element) => {
      element.style.backgroundColor = 'none';
    });
    const currentElement = document.getElementById(selectedType);
    if (currentElement) {
      currentElement.style.backgroundColor = 'lightblue';
    }
  }, [selectedType]);

  const handleClick = (type) => {
    console.log('handle click');
    setSelectedType(type);
  }

  return (
    <div className="container">
      <div className={styles.leftContainer}>
        <ul className={styles.ul}>
        {types && types.map((type, index) => {
          if(type === 'home-page') return null;
          return (
            <li key={index} onClick={() => {handleClick(type)}} className={`selectable ${styles.li}`} id={type.name}>
              <span style={{float: 'left'}}>{type.split('-').join(' ')}</span>
              <i className="bi bi-chevron-right" style={{float: 'right'}}></i>
            </li>
          )})}
        </ul>
      </div>
      <div className={styles.rightContainer}>
        <Heading text={selectedType.split('-').join(' ')} />
      </div>
    </div>
  )
}
