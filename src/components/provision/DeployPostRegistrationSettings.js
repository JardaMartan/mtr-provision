import React from "react";
import propTypes from "prop-types";
import { Button } from "@momentum-ui/react";
import WebexInfo from "../device/WebexInfo";

const DeployPostRegistrationSettings = ({
  preferences,
  webexInfo,
  deployRegPrefs,
}) => {
  return (
    <div>
      <WebexInfo webexInfo={webexInfo} />
      <b>Following settings will be deployed to the device</b>
      <div className="input-container">
        <label className="md-label element">Local user</label>
        <label className="md-label element">
          {preferences.localUser.username}
        </label>
      </div>
      <Button onClick={deployRegPrefs} color="blue" ariaLabel="deploy config">
        Deploy Settings
      </Button>
    </div>
  );
};

DeployPostRegistrationSettings.propTypes = {
  preferences: propTypes.object.isRequired,
  webexInfo: propTypes.object.isRequired,
  deployRegPrefs: propTypes.func.isRequired,
};

export default DeployPostRegistrationSettings;
