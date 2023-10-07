import React from "react";
import PropTypes from "prop-types";

const LocalUser = ({ onChange, localUser }) => (
  <div>
    <div className="input-container">
      <label className="md-label element">Username</label>
      <input
        type="text"
        name="username"
        className="md-input element"
        value={localUser.username}
        onChange={onChange}
      />
    </div>
    <div className="input-container">
      <label className="md-label element">Password</label>
      <input
        type="password"
        name="password"
        className="md-input element"
        value={localUser.password}
        onChange={onChange}
      />
    </div>
  </div>
);

LocalUser.propTypes = {
  onChange: PropTypes.func.isRequired,
  localUser: PropTypes.object.isRequired,
};

export default LocalUser;
