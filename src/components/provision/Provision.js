import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  createActivationCode,
  deployDevicePrefs,
  deployActivationCode,
  closeFirstTimeWizard,
  deployPostRegistrationSettings,
  deviceConnection,
  setDateTimePrefs,
  setLanguage,
  getDevices,
  createWorkspace,
} from "../../redux/actions/deviceActions";
import { loadWorkspaces } from "../../redux/actions/workspacesActions";
import WorkspaceSelection from "./WorkspaceSelection";
import DeployActivationCode from "./DeployActivationCode";
import DeployDeviceSettings from "./DeployDeviceSettings";
import DeployPostRegistrationSettings from "./DeployPostRegistrationSettings";
import CreateWorkspace from "./CreateWorkspace";
import CheckWebexAuthorization from "./CheckWebexAuthorization";

const Provision = ({
  deployDevicePrefs,
  deployActivationCode, //eslint-disable-line no-unused-vars
  loadWorkspaces,
  createActivationCode,
  closeFirstTimeWizard,
  deployPostRegistrationSettings,
  setDateTimePrefs, //eslint-disable-line no-unused-vars
  setLanguage, //eslint-disable-line no-unused-vars
  deviceConnection,
  getDevices,
  createWorkspace,
  device,
  connection,
  webex,
  info,
  webexInfo,
  preferences,
  workspaces,
  ...props //eslint-disable-line no-unused-vars
}) => {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [errors, setErrors] = useState({}); // eslint-disable-line no-unused-vars
  const [activationCodeDeployed, setActivationCodeDeployed] = useState(false); // eslint-disable-line no-unused-vars
  const [webexIsAuthorized, setWebexIsAuthorized] = useState(true); // Initially set to true
  const webexExpInt = Date.parse(webex.expires) || 0;

  // Use useEffect to check the authorization status whenever 'expInt' changes
  useEffect(() => {
    const checkWebexAuthorization = () => {
      const currentTime = Date.now();
      const isExpired = webexExpInt < currentTime;
      setWebexIsAuthorized(!isExpired); // Update 'isAuthorized' based on the condition
    };

    // Check authorization status initially and then every second (adjust as needed)
    checkWebexAuthorization();
    const intervalId = setInterval(checkWebexAuthorization, 1000);

    return () => {
      clearInterval(intervalId); // Cleanup when the component unmounts
    };
  }, [webexExpInt]);

  function deployPrefs() {
    deployDevicePrefs(device, preferences);
  }

  function generateActivationCode(workspace) {
    console.log("generate activation code for: " + JSON.stringify(workspace));
    createActivationCode(webex, workspace);
  }

  function deployActivationCodeToDevice(code) {
    console.log(
      `first time wizard: ${
        preferences.closeInitialWizard ? "close" : "leave open"
      }`
    );
    if (preferences.closeInitialWizard) {
      closeFirstTimeWizard(device);
    }
    console.log(
      "deploy activation code: " + code + " to: " + JSON.stringify(device)
    );
    deployActivationCode(device, code);
    setActivationCodeDeployed(true);
  }

  function deployPostRegistrationPreferences() {
    console.log("deploy post registration preferences");
    deployPostRegistrationSettings(webex, info.deviceId, preferences);
    console.log(
      `set device connection: ${JSON.stringify(connection)} <- ${JSON.stringify(
        preferences.localUser
      )}`
    );
    deviceConnection({
      ...connection,
      username: preferences.localUser.username,
      password: preferences.localUser.password,
    });
  }

  function runCreateWorkspace(workspaceName, locationId, floorId) {
    console.log(
      `create workspace: ${workspaceName} at ${locationId} on floor ${floorId}`
    );
    createWorkspace(webex, workspaceName, locationId, floorId);
    // loadWorkspaces(webex);
  }

  useEffect(() => {
    if (workspaces.length === 0) {
      loadWorkspaces(webex);
    }
  }, [workspaces]);

  useEffect(() => {
    if (info.status === "connected") {
      setDeviceConnected(true);
    } else {
      setDeviceConnected(false);
    }
  }, [info.status]);

  useEffect(() => {
    function checkDeviceRegistration(logInfo = false) {
      console.log("check device registration to webex");
      getDevices(webex, { serial: info.serialNumber }, logInfo);
    }

    if (
      activationCodeDeployed ||
      (info.status === "connected" && info.serialNumber.length > 0)
    ) {
      console.log("start post registration device polling from Webex");

      checkDeviceRegistration(true);
      const intervalId = setInterval(checkDeviceRegistration, 10000);

      return () => {
        clearInterval(intervalId); // Cleanup when the component unmounts
      };
    }
  }, [activationCodeDeployed]);

  useEffect(() => {
    console.log(`device info: ${JSON.stringify(info)}`);
  }, [info]);

  return (
    <div>
      <h1>Provision</h1>
      <p>Create resource mailbox</p>
      <p>Get account password</p>
      <p>Assign licenses to account</p>
      <hr />
      <h4>Deploy pre-deployment device preferences</h4>
      <br />
      <DeployDeviceSettings
        handleDeploy={deployPrefs}
        deviceConnected={deviceConnected}
      />
      <hr />
      <h4>Create Workspace</h4>
      <br />
      {webexIsAuthorized ? (
        <CreateWorkspace createWorkspace={runCreateWorkspace} />
      ) : (
        <CheckWebexAuthorization />
      )}
      <hr />
      <h4>Select a workspace and generate code</h4>
      <br />
      {webexIsAuthorized ? (
        <WorkspaceSelection handleSelectWorkspace={generateActivationCode} />
      ) : (
        <CheckWebexAuthorization />
      )}
      <hr />
      <DeployActivationCode
        activationCode={device.activationCode}
        handleDeploy={deployActivationCodeToDevice}
        deviceConnected={deviceConnected}
      />
      <h4>Deploy post-deployment device preferences</h4>
      <br />
      {webexIsAuthorized ? (
        <DeployPostRegistrationSettings
          preferences={preferences}
          webexInfo={webexInfo}
          deployRegPrefs={deployPostRegistrationPreferences}
        />
      ) : (
        <CheckWebexAuthorization />
      )}
      <hr />
      <p>
        If the device has remote monitoring option, grab a screenshot and run
        OCR to get MTR prompt
      </p>
      <p>Login the MTR</p>
    </div>
  );
};

Provision.propTypes = {
  deployDevicePrefs: PropTypes.func.isRequired,
  deployActivationCode: PropTypes.func.isRequired,
  loadWorkspaces: PropTypes.func.isRequired,
  createActivationCode: PropTypes.func.isRequired,
  closeFirstTimeWizard: PropTypes.func.isRequired,
  deployPostRegistrationSettings: PropTypes.func.isRequired,
  setDateTimePrefs: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  getDevices: PropTypes.func.isRequired,
  createWorkspace: PropTypes.func.isRequired,
  deviceConnection: PropTypes.func.isRequired,
  device: PropTypes.object.isRequired,
  connection: PropTypes.object.isRequired,
  webex: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  webexInfo: PropTypes.object.isRequired,
  preferences: PropTypes.object.isRequired,
  workspaces: PropTypes.array.isRequired,
  errors: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    device: state.device,
    info: state.device.info,
    connection: state.device.connection,
    webexInfo: state.device.info.webexInfo,
    webex: state.webex,
    preferences: state.preferences,
    workspaces: state.workspaces,
  };
}

const mapDispatchToProps = {
  deployDevicePrefs,
  deployActivationCode,
  loadWorkspaces,
  createActivationCode,
  closeFirstTimeWizard,
  deployPostRegistrationSettings,
  setDateTimePrefs,
  setLanguage,
  getDevices,
  createWorkspace,
  deviceConnection,
};

export default connect(mapStateToProps, mapDispatchToProps)(Provision);
