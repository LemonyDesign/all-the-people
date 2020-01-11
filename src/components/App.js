import React, { useState, useEffect } from "react";
import axios from "axios";
import Users from "./Users";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      setUsers(response.data.data);
      setLoading(false);
      // setPage(response.data.page);
    } catch (err) {
      setError(err);
    }
  };

  const deleteUser = userId => {
    const userToDelete = users[userId];

    const usersUpdated = users.filter(user => {
      return user !== userToDelete;
    });
    setUsers(usersUpdated);
  };

  return (
    <main className="maincontent">
      <h1>Users</h1>
      <p>Yes, we are people. Are we?</p>

      <section className="userSection">
        {loading ? (
          <div>Users are loading</div>
        ) : (
          <Users users={users} deleteUser={deleteUser} />
        )}
        {error && <div className="getUsersError">{error.message}</div>}
      </section>
    </main>
  );
}
export default App;
