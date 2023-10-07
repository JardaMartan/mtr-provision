import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "@momentum-ui/react";

const DeployDeviceSettings = ({ handleDeploy, deviceConnected }) => {
  const handleDeployClick = (event) => {
    event.preventDefault();
    handleDeploy();
  };

  let button;
  if (deviceConnected) {
    button = (
      <Button
        type="submit"
        onClick={handleDeployClick}
        color="blue"
        ariaLabel="deploy preferences"
      >
        Deploy device preferences
      </Button>
    );
  } else {
    button = (
      <Link to="../device">
        <Button
          onClick={() => {}}
          color="blue"
          ariaLabel="check device connection"
        >
          Check device connection
        </Button>
      </Link>
    );
  }

  return (
    <div>
      <p>
        Additional settings (time zone, date format, time format, language,...)
      </p>
      {button}
    </div>
  );
};

DeployDeviceSettings.propTypes = {
  handleDeploy: PropTypes.func.isRequired,
  deviceConnected: PropTypes.bool.isRequired,
};

export default DeployDeviceSettings;
