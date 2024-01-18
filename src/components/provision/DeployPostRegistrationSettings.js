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
      {preferences.localUser.username.length > 0 && (
        <div className="input-container">
          <label className="md-label element">Local user</label>
          <label className="md-label element">
            {preferences.localUser.username}
          </label>
        </div>
      )}
      {preferences.installMTR && (
        <div className="input-container">
          <label className="md-label element">install MTR software</label>
        </div>
      )}
      <div className="input-container">
        <Button onClick={deployRegPrefs} color="blue" ariaLabel="deploy config">
          Deploy Settings
        </Button>
      </div>
    </div>
  );
};

DeployPostRegistrationSettings.propTypes = {
  preferences: propTypes.object.isRequired,
  webexInfo: propTypes.object.isRequired,
  deployRegPrefs: propTypes.func.isRequired,
};

export default DeployPostRegistrationSettings;
