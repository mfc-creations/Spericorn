import React from "react";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/userActions";
import Form from "./Form";
import UserTable from "./UserTable";
import "./AddUser.css";

const AddUser = (props) => {
  return (
    <>
      <Form />
      <UserTable data={props.user.users} deleteUser={props.deleteUser} />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { deleteUser })(AddUser);
