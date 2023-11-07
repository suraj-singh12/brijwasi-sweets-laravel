import React, {useEffect, useState} from 'react'
import axiosClient from '../axios-client';
import DisplayProducts from '../components/DisplayProducts';
import Heading from './Heading';
import axios from 'axios';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axiosClient.get(apiBaseUrl + '/products/uniqueTypeValues')
    .then(({data}) => {
      console.log('unique type values / products: ', data);
      setProducts(data);
    })
    scrollTo(0, 0);
  }, [])

  useEffect(() => {
    axios.get(apiBaseUrl + '/products/name/Brijwasi')
    .then(({data}) => {
      console.log('banner data: ', data);
      setBanners(data);
    })
  }, []);

  return (
    <>
      <Heading text={"Our Products"} />
      <DisplayProducts products={products} />
    </>
  )
}
