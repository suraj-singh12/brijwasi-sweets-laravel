import React from 'react';

export default function Heading({text}) {
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="heading">
      <img src={apiBaseUrl + '/public/images/heading_left.png'} alt="heading left" />
      <h2>{text}</h2>
      <img src={apiBaseUrl + '/public/images/heading_right.png'} alt="heading right" />
    </div>
  )
}
