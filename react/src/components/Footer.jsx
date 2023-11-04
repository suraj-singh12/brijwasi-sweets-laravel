import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const handleClick = (e) => {
    console.log(e.target.innerText);
  }
  const navigateTo = useNavigate();

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
    <footer>
      <div className="about-us">
        <h3>About Us</h3>
      In the early forties, a young man from Braj in Mathura, landed on the shores of the bustling metropolis called Mumbai. He arrived with a dream to have his own shop selling traditional mithais from his beloved Braj Bhoomi. While he established his first outlet in Kalbadevi, little did he know that he was in fact pioneering a leading chain of stores which would one day become a household name!
      </div>
      <div className="quick-links">
        <h3>Quick Links</h3>
        <p onClick={handleNavigate}>Home</p>
        <p onClick={handleNavigate}>Our Products</p>
        <p onClick={handleNavigate}>About Us</p>
        <p onClick={handleNavigate}>Contact Us</p>
      </div>
      <div className="products">
        <h3>Products</h3>
        <p onClick={handleClick}>Dry Fruit Sweet</p>
        <p onClick={handleClick}>Mawa Sweet</p>
        <p onClick={handleClick}>Desi Ghee Sweets</p>
        <p onClick={handleClick}>Milk Sweets</p>
        <p onClick={handleClick}>Fresh Snacks</p>
      </div>
      <div className="contact-us">
        <h3>Contact Us</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vel voluptate voluptates, tenetur, quod aliquid maxime magnam eius rerum eaque magni sequi natus.</p>
        <p>+91 9999999999</p>
        <p>Dev: @suraj-singh12</p>
      </div>
    </footer>
  )
}
