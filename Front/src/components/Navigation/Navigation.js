import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
const Navigation = () => (
 
  <div>
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/courses">Courses</Link></li>
      <li className="rightAling"><Link to="/login">Login</Link></li>
      <li className="rightAling"><Link to="/login">Sign Up</Link></li>
    </ul>
  </div>
);
export default Navigation;