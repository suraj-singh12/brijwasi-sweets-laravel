import React, { useEffect, useRef, useState } from 'react';
import axiosClient from '../axios-client';
import styles from './OurProducts.module.css';
import Heading from '../views/Heading';
import DisplayProducts from './DisplayProducts';


export default function OurProducts() {
  const [types, setTypes] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectedType, setSelectedType] = useState('combos');
  const [products, setProducts] = useState([]);
  const divRef = useRef();
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axiosClient.get(apiBaseUrl + '/products/types')
    .then(({data}) => {
      console.log('OurProducts: ', data);
      setTypes(data);
    });
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // unhighlight all & highlight the selected option
    const elements = document.querySelectorAll('.selectable');
    elements.forEach((element) => {
      element.style.backgroundColor = 'none';
    });
    const currentElement = document.getElementById(selectedType);
    if (currentElement) {
      currentElement.style.backgroundColor = 'lightblue';
    }

    // now make the api call to get items of selected type
    axiosClient.get(apiBaseUrl + '/products/' + selectedType)
    .then(({data}) => {
      setProducts(data);
    })
    .catch(err => {
      console.log('error :-|');
    })

    if(!isFirstLoad)
      divRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
  }, [selectedType]);

  const handleClick = (type) => {
    setSelectedType(type);
    setIsFirstLoad(false);
  }

  return (
    <div className="container" ref={divRef}>
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
        <DisplayProducts products={products} withName={true} />
      </div>
    </div>
  )
}
