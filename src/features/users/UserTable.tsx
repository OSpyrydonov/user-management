import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchUsers, setFilter } from "./usersSlice";
import styles from "./UserTable.module.scss";

const UserTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, filters, status } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ [e.target.name]: e.target.value }));
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        user.phone.toLowerCase().includes(filters.phone.toLowerCase())
    );
  }, [users, filters]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Failed to load users.</div>;

  return (
    <div className={styles.container}>
      <h1>User Management</h1>
      <div className={styles.table_container}>
        <div className={styles.filters}>
          <input
            name="name"
            placeholder="Filter by name"
            value={filters.name}
            onChange={handleFilterChange}
          />
          <input
            name="username"
            placeholder="Filter by username"
            value={filters.username}
            onChange={handleFilterChange}
          />
          <input
            name="email"
            placeholder="Filter by email"
            value={filters.email}
            onChange={handleFilterChange}
          />
          <input
            name="phone"
            placeholder="Filter by phone"
            value={filters.phone}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.table_wrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
