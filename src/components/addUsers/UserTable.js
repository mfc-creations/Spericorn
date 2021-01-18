import React from "react";
import { Link } from "react-router-dom";

const UserTable = ({ data, deleteUser }) => {
  let body = "";
  if (data.length === 0) {
    return <span className="no-users">No users</span>;
  } else {
    body = data.map((usr, index) => {
      return (
        <tr key={index}>
          <td>{usr.firstName + " " + usr.lastName}</td>
          <td>{usr.email}</td>
          <td>{usr.active ? "Active" : "Inactive"}</td>
          <td>
            <Link to={`/edituser/${data.indexOf(usr)}`}>Edit</Link>
          </td>
          <td onClick={() => deleteUser(index)} className="delete-btn">
            Delete
          </td>
        </tr>
      );
    });
  }
  return (
    <table className="users-table">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
        <th></th>
        <th></th>
      </tr>
      <tbody>{body}</tbody>
    </table>
  );
};

export default UserTable;
