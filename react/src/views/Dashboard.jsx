import React, {useEffect, useState} from 'react'
import imageMapper from "../assets/imageMapper.js";
import Card from "../components/Card.jsx";

export default function Dashboard() {
  console.log(imageMapper);
  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridTemplateRows: '1fr'}}>
      {
        imageMapper.map((data, index) => (
          <Card key={index} data={data} />
        ))
      }
    </div>
  )
}
