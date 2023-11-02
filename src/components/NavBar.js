import React from "react";
import "../styles/navbar.css";
const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <ul>
          <li>مقالات</li>
          <li>احصائيات</li>
          <li>النجوم</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
