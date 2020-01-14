import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import AddUser from "./AddUser";
import Users from "./Users";
import Paging from "./Paging";

import "../styles/base/base.scss";
import "../styles/base/forms.scss";
import "../styles/components/app.scss";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    getUsers();
  }, [isLoggedIn, currentPage]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${currentPage}`
      );
      setUsers(response.data.data);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  const deleteUser = userId => {
    const userToDelete = users[userId];
    const userDeleted = users.filter(user => {
      return user !== userToDelete;
    });
    setUsers(userDeleted);
  };

  const receiveNewUser = user => {
    const userAdded = users.concat(user);
    setUsers(userAdded);
  };

  const receivePages = page => {
    setCurrentPage(page);
  };

  const receiveAuth = auth => {
    localStorage.setItem("token", auth);
  };

  const receiveRegisterState = id => {
    setIsRegistered(id);
  };

  const receiveLoginState = state => {
    setIsLoggedIn(state);
  };

  const receiveLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <div>
      <Header receiveLogout={receiveLogout} isLoggedIn={isLoggedIn} />
      <main className="Wrapper">
        {!isLoggedIn && (
          <section className="Account">
            <h1 className="Account__title">Log in or Register</h1>
            <div className="Account__entry">
              <section className="Login">
                {!isLoggedIn && (
                  <Login
                    receiveLoginState={receiveLoginState}
                    receiveAuth={receiveAuth}
                  />
                )}
              </section>
              <section className="Register">
                {!isRegistered && (
                  <Register receiveRegisterState={receiveRegisterState} />
                )}

                {isRegistered && (
                  <h2 className="Register__notice">Please log in!</h2>
                )}
              </section>
            </div>
          </section>
        )}

        {isLoggedIn && (
          <section className="Users">
            <AddUser receiveNewUser={receiveNewUser} />
            {loading ? (
              <div>Users are loading</div>
            ) : (
              <Users users={users} deleteUser={deleteUser} />
            )}
            {error && <div className="DisplayError">{error.message}</div>}
            {users && (
              <Paging
                receivePages={receivePages}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            )}
          </section>
        )}
      </main>
    </div>
  );
}
export default App;
