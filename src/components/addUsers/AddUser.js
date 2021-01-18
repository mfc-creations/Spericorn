import React from "react";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/userActions";
import "./AddUser.css";
import Form from "./Form";
import UserTable from "./UserTable";

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
