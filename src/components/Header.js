import React from "react";

function Header({ isLoggedIn, receiveLogout }) {
  const handleLogout = event => {
    receiveLogout(true);
  };
  return (
    <>
      <header className="Header">
        <h1 className="Header__title">All the People</h1>
        <p>
          All the people, so many people, snd they all go hand-in-hand,
          hand-in-hand, through their parklife&hellip;
        </p>
      </header>
      {isLoggedIn && (
        <nav className="Header__navigation">
          <ul>
            <li>
              <button onClick={handleLogout}>Log out</button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Header;
