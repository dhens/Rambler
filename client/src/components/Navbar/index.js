import React from "react";
import { Link } from "react-router-dom";
import GetUserInfo from "../../components/GetUserInfo";
import bulma from "bulma";
import "./style.css";
import logo from "../../assets/logo.png"

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

function Navbar() {
    return (

  <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img id="navLogo" className="is-rounded" src={logo} width="112" height="28" />
    </a>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu is-active">
    <div className="navbar-start">
      <div className="navbar-item">
        <div className="buttons">
          <Link to="/">
          <a className="navbar-item">
            Search Hikes
          </a>
        </Link>
        <Link to="/bucketList">
          <a className="navbar-item">
            Bucket List
          </a>
        </Link>
        <Link to="/log">
          <a className="navbar-item">
            Hike Log
          </a>
        </Link>
        </div>
      </div> 
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
        <GetUserInfo />
          <Link to="/Auth">
            <a className="button is-light">
              Log in
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
</nav>
    );
};

export default Navbar;