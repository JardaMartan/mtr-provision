import React from "react";
import PropTypes from "prop-types";
import { Button } from "@momentum-ui/react";

const DeviceLoginPage = ({ connection, onSave, onChange, errors = {} }) => {
  return (
    <form onSubmit={onSave}>
      <h2>Device</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <div className="input-container">
        <label className="md-label element">IP address</label>
        <input
          name="ipAddress"
          type="text"
          className="md-input element"
          onChange={onChange}
          value={connection.ipAddress}
        />
      </div>
      <div className="input-container">
        <label className="md-label element">Username</label>
        <input
          name="username"
          type="text"
          className="md-input element"
          onChange={onChange}
          value={connection.username}
        />
      </div>
      <div className="input-container">
        <label className="md-label element">Password</label>
        <input
          name="password"
          type="password"
          className="md-input element"
          onChange={onChange}
          value={connection.password}
        />
      </div>
      <br />
      <Button type="submit" color="blue" ariaLabel="connect">
        Connect
      </Button>
    </form>
  );
};

DeviceLoginPage.propTypes = {
  connection: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DeviceLoginPage;
