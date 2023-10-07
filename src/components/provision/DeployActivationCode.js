import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "@momentum-ui/react";

const DeployActivationCode = ({
  activationCode,
  handleDeploy,
  deviceConnected,
}) => {
  const expInt = Date.parse(activationCode.expiryTime) || 0;
  const expDate = new Date(expInt);

  function insertDashes(inputString) {
    const length = inputString.length;
    const parts = [];

    for (let i = 0; i < length; i += 4) {
      parts.push(inputString.slice(i, i + 4));
    }

    return parts.join("-");
  }

  const handleDeployClick = (event) => {
    event.preventDefault();
    handleDeploy(activationCode.code);
  };

  if (activationCode.code === undefined) {
    return <></>;
  }

  let button;
  if (deviceConnected) {
    button = (
      <Button
        type="submit"
        onClick={handleDeployClick}
        color="blue"
        ariaLabel="deploy code"
      >
        Deploy activation code
      </Button>
    );
  } else {
    button = (
      <Link to="../device">
        <Button onClick={() => {}} color="blue" ariaLabel="check connection">
          Check device connection
        </Button>
      </Link>
    );
  }

  return (
    <div>
      <h4>Register device to Webex</h4>
      Activation code: <b>{insertDashes(activationCode.code)}</b>
      <br />
      Expires:{" "}
      {expDate.toLocaleString("en-US", {
        hour12: false,
        dateStyle: "medium",
        timeStyle: "medium",
      })}
      <br />
      {button}
      <hr />
    </div>
  );
};

DeployActivationCode.propTypes = {
  activationCode: PropTypes.object.isRequired,
  deviceConnected: PropTypes.bool.isRequired,
  handleDeploy: PropTypes.func.isRequired,
};

export default DeployActivationCode;
