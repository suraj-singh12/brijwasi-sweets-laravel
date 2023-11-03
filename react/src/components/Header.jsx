import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';


export default function Header() {
  const {user} = useStateContext();

  return (
    <header className="fadeInDown">
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <div className="links">
        <a href="/dashboard">Home</a>
        <a href="#">Our Products</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <a href="#">{user.name}</a>
      </div>
    </header>
  )
}
