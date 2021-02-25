import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../actions/user_actions';

const RegisterLogin = (props) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);

  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error}</p>);
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = { email: input.email, password: input.password };

    if (isFormValid(input)) {
      setErrors([]);
      props.dispatch(loginUser(dataToSubmit)).then((response) => {
        if (response.payload.loginSuccess) {
          props.history.push('/');
        } else {
          setErrors(
            errors.concat(
              'Failed to log in, you can check your Email and Password'
            )
          );
        }
      });
    } else {
      setErrors(errors.concat('Form is not valid'));
    }
  };
  const isFormValid = ({ email, password }) => email && password;

  return (
    <div className="container">
      <h2>Login</h2>
      <div className="row">
        <form className="col s12">
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
              <label htmlFor="email">Email</label>
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
                name="password"
                value={input.password}
                onChange={handleChange}
                id="password"
                type="password"
                className="validate"
              />
              <label htmlFor="password">Password</label>
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
                Login
              </button>{' '}
              &nbsp; &nbsp;
              <Link to="/register">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                >
                  Sign Up
                </button>
              </Link>
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

export default connect(mapStateToProps)(RegisterLogin);
