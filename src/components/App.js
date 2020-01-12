import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import AddUser from "./AddUser";
import Users from "./Users";
import Paging from "./Paging";

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
  }, [isLoggedIn]);

  useEffect(() => {
    getUsers();
  }, [currentPage]);

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

  // NB user is different model to other users, but has required key:values for output
  // TODO: Persist array  to local storage) so don't lose added user on paging/refresh
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

  const notRegisteredNotLoggedIn = !isLoggedIn && !isRegistered;
  const registeredNotLoggedIn = !isLoggedIn && isRegistered;

  return (
    <main className="maincontent">
      <Header receiveLogout={receiveLogout} isLoggedIn={isLoggedIn} />

      {notRegisteredNotLoggedIn && (
        <Register receiveRegisterState={receiveRegisterState} />
      )}

      {registeredNotLoggedIn && "Please log in to your account"}

      {!isLoggedIn && (
        <Login
          receiveLoginState={receiveLoginState}
          receiveAuth={receiveAuth}
        />
      )}

      {isLoggedIn && (
        <section className="userSection">
          <AddUser receiveNewUser={receiveNewUser} />
          {loading ? (
            <div>Users are loading</div>
          ) : (
            <Users users={users} deleteUser={deleteUser} />
          )}
          {error && <div className="displayError">{error.message}</div>}
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
  );
}
export default App;
