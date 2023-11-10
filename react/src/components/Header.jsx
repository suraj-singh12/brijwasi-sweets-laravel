import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigateTo = useNavigate();
  const {user} = useStateContext();

  const handleNavigate = (e) => {
    console.log(e.target.innerText);
    const name = e.target.innerText.toLowerCase();
    if(name === 'home')
      navigateTo('/dashboard');
    else if(name === 'our products')
      navigateTo('/ourProducts');
    else if(name === 'about us')
      navigateTo('/aboutUs');
    else if(name === 'contact us')
      navigateTo('/contactUs')
  }

  return (
    <header className="fadeInDown">
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <div className="links">
        <p onClick={handleNavigate}>Home</p>
        <p onClick={handleNavigate}>Our Products</p>
        <p onClick={handleNavigate}>About Us</p>
        <p onClick={handleNavigate}>Contact Us</p>
        <p>{user.name}</p>
        {/* <a href="/dashboard">Home</a>
        <a href="#">Our Products</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <a href="#">{user.name}</a> */}
      </div>
    </header>
  )
}
