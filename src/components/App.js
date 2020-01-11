import React, { useState, useEffect } from "react";
import axios from "axios";
import AddUser from "./AddUser";
import Users from "./Users";
import Paging from "./Paging";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [currentPage]); // Only re-run the effect if currentPage changes

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
  const setNewUser = user => {
    const userAdded = users.concat(user);
    setUsers(userAdded);
  };

  const receivePages = page => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <main className="maincontent">
      <h1>Users</h1>
      <p>Yes, we are people. Are we?</p>

      <AddUser setNewUser={setNewUser} />

      <section className="userSection">
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
    </main>
  );
}
export default App;
