import AddUser from "../components/addUsers/AddUser";
import EditUser from "../components/addUsers/Form";

const routes = [
  {
    path: "/edituser/:index",
    component: EditUser,
    title: "Edit user",
  },
  {
    path: "/",
    component: AddUser,
    title: "Add user",
  },
];

export default routes;
