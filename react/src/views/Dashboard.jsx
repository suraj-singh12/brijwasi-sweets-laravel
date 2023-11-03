import React, {useEffect, useState} from 'react'
import axiosClient from '../axios-client';
import DisplayProducts from '../components/DisplayProducts';
import Heading from './Heading';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axiosClient.get(apiBaseUrl + '/products/uniqueTypeValues')
    .then(({data}) => {
      console.log('unique type values / products: ', data);
      setProducts(data);
    })
  }, [])

  return (
    <>
      <Heading text={"Our Products"} />
      <DisplayProducts products={products} />
    </>
  )
}
