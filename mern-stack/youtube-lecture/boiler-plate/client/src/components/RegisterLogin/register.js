import React, { useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/user_actions';

const Register = (props) => {
  const [input, setInput] = useState({
    lastname: '',
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const isFormValid = () => {
    let errors = [];
    let error;

    if (isFormEmpty(input)) {
      error = { message: 'Fill in all fields' };
      setErrors(errors.concat(error));
    } else if (!isPasswordValid(input)) {
      error = { message: 'Password is invalid' };
      setErrors(errors.concat(error));
    } else {
      return true;
    }
  };

  const isFormEmpty = ({
    lastname,
    name,
    email,
    password,
    passwordConfirmation,
  }) =>
    !name.length ||
    !lastname.length ||
    !email.length ||
    !password.length ||
    !passwordConfirmation.length;

  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  const submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = input;

    if (isFormValid()) {
      setErrors([]);
      props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          console.log(response);
          if (response.payload.success) {
            props.history.push('/login');
          } else {
            setErrors(
              errors.concat({
                message: 'your attempt to send data to DB was failed',
              })
            );
          }
        })
        .catch((err) => {
          setErrors(
            errors.concat({
              message: err,
            })
          );
        });
    } else {
      console.log('Form is not valid');
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                name="lastname"
                value={input.lastname}
                onChange={handleChange}
                id="lastname"
                type="text"
                className="validate"
              />
              <label className="active" htmlFor="lastname">
                Last Name
              </label>
              <span
                className="helper-text"
                data-error="Type a right type email"
                data-success="right"
              ></span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="name"
                value={input.name}
                onChange={handleChange}
                id="name"
                type="text"
                className="validate"
              />
              <label className="active" htmlFor="name">
                Name
              </label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              ></span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="email"
                value={input.email}
                onChange={handleChange}
                id="email"
                type="email"
                className="validate"
              />
              <label className="active" htmlFor="email">
                Email
              </label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              ></span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="password"
                value={input.password}
                onChange={handleChange}
                id="password"
                type="password"
                className="validate"
              />
              <label className="active" htmlFor="password">
                Password
              </label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              ></span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="passwordConfirmation"
                value={input.passwordConfirmation}
                onChange={handleChange}
                id="passwordConfirmation"
                type="password"
                className="validate"
              />
              <label className="active" htmlFor="passwordConfirmation">
                Password Confirmation
              </label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              ></span>
            </div>
          </div>
          {errors.length > 0 && <div>{displayErrors(errors)}</div>}
          <div className="row">
            <div className="col s12">
              <button
                className="btn waves-effect red lighten-2"
                type="submit"
                name="action"
                onClick={submitForm}
              >
                Create an account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Register);
