import React from "react";

import "../styles/components/header.scss";

function Header({ isLoggedIn, receiveLogout }) {
  const handleLogout = event => {
    receiveLogout(true);
  };
  return (
    <div className="Header">
      <header className="Header__hero">
        <div className="Header__container">
          <h1 className="Header__title">All the People</h1>
          <p className="Header__tagline">
            All the people, so many people, and they all go hand-in-hand,
            hand-in-hand, through their parklife.
          </p>
        </div>

        {isLoggedIn && (
          <nav className="Header__navigation">
            <button
              className="BtnCommon BtnCommon--main BtnCommon--navigation"
              onClick={handleLogout}
            >
              Log out
            </button>
          </nav>
        )}
      </header>
    </div>
  );
}

export default Header;
