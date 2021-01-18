import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addUser, fetchCountries, editUser } from "../../actions/userActions";
import TextField from "../common/TextField";
import SelectFiled from "../common/Select";
import validator from "validator";
import Edit from "../../assets/edit.svg";
import "./AddUser.css";

const Form = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState({});
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (props.match) {
      setEdit(true);
      const user = props.user.users[parseInt(props.match.params.index)];
      if (user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setAge(user.age);
        setEmail(user.email);
        setActive(user.active);
        setCountry(user.country);
        setState(user.state);
        setPhone(user.phone);
        setPhoto(user.photo);
      } else {
        setErrors({ data: "Data cleared" });
      }
    }
    props.fetchCountries();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if (validator.isEmpty(firstName)) {
      setErrors((prevState) => ({
        ...prevState,
        firstName: "Enter Your First Name",
      }));
    } else if (validator.isEmpty(age)) {
      setErrors((prevState) => ({
        ...prevState,
        age: "Enter Your Age",
      }));
    } else if (validator.isEmpty(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Enter Your Email",
      }));
    } else if (!validator.isEmpty(email) && !validator.isEmail(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Enter a valid email",
      }));
    } else if (validator.isEmpty(country)) {
      setErrors((prevState) => ({
        ...prevState,
        country: "Select your country",
      }));
    } else if (validator.isEmpty(state)) {
      setErrors((prevState) => ({
        ...prevState,
        state: "Enter Your State",
      }));
    } else if (validator.isEmpty(phone)) {
      setErrors((prevState) => ({
        ...prevState,
        phone: "Enter Your phone number",
      }));
    } else if (!validator.isEmpty(phone) && phone.length !== 10) {
      setErrors((prevState) => ({
        ...prevState,
        phone: "Should be 10 digits",
      }));
    } else {
      const newUser = {
        firstName,
        lastName,
        age,
        email,
        active,
        country,
        state,
        phone,
        photo,
      };
      edit
        ? props.editUser(newUser, parseInt(props.match.params.index), history)
        : props.addUser(newUser);
    }
  };

  const { countriesList } = props.user;

  let countries = [];

  countriesList.map((item, index) => {
    countries.push({ value: item.country, text: item.country });
  });

  let states = [];
  if (!validator.isEmpty(country)) {
    countriesList
      .filter((ct) => ct.country === country)[0]
      .states.map((item, index) => {
        states.push({ value: item, text: item });
      });
  }

  if (errors.data) {
    return errors.data;
  }

  return (
    <div className="form">
      <div className="profile-pic">
        <img src={photo.preview} alt="" className="image" />
        <label htmlFor="file-input">
          <img src={Edit} alt="" className="edit-icon" />
        </label>
        <input
          id="file-input"
          style={{ display: "none" }}
          type="file"
          onChange={(e) =>
            setPhoto({
              preview: URL.createObjectURL(e.target.files[0]),
              raw: e.target.files[0],
            })
          }
        />
      </div>
      <form>
        <table>
          <tbody>
            <TextField
              name="firstName"
              label="First Name "
              value={firstName}
              placeholder="First Name"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
            />
            <TextField
              name="lastName"
              label="Last Name "
              value={lastName}
              placeholder="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
            />{" "}
            <TextField
              name="age"
              label="Age "
              value={age}
              placeholder="Age"
              type="number"
              onChange={(e) => setAge(e.target.value)}
              error={errors.age}
            />{" "}
            <TextField
              name="email"
              label="Email "
              value={email}
              placeholder="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />{" "}
            <SelectFiled
              label="Active"
              name="active"
              onChange={(e) => setActive(e.target.value)}
              value={active}
              opts={[
                { value: false, text: "False" },
                { value: true, text: "False" },
              ]}
            />
            <SelectFiled
              label="Country"
              name="country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              placeholder="Country"
              opts={countries}
              error={errors.country}
            />
            <SelectFiled
              label="State"
              name="state"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              value={state}
              disabled={validator.isEmpty(country)}
              opts={states}
              error={errors.state}
            />
            <TextField
              name="phone"
              label="Phone "
              value={phone}
              placeholder="Phone"
              type="number"
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            />
          </tbody>
        </table>
        <button className="submit-btn" onClick={onSubmit}>
          {edit ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { addUser, fetchCountries, editUser })(
  Form
);
