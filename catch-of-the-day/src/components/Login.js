import React from "react";
import PropTypes from 'prop-types';

const Login = (props) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign to manage your store's inventory.</p>
    <button
      className="github"
      onClick={() => props.authenticate("Github")}
    >
      Log in with github
    </button>
  </nav>
);

Login.propTypes =  {
    authenticate: PropTypes.func.isRequired,
}

export default Login;
