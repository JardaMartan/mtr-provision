import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  deviceLogin,
  deviceConnection,
  getDeviceInfo,
  getDevices,
} from "../../redux/actions/deviceActions";
import DeviceLoginPage from "./DeviceLoginPage";
import PropTypes from "prop-types";
import DeviceInfo from "./DeviceInfo";
import WebexInfo from "./WebexInfo";

function ManageDeviceLogin({
  deviceLogin,
  deviceConnection,
  getDevices,
  getDeviceInfo,
  device,
  connection,
  connectionConfigured,
  info,
  webexInfo,
  webex,
  ...props //eslint-disable-line no-unused-vars
}) {
  const [errors, setErrors] = useState({}); // eslint-disable-line no-unused-vars
  const [deviceConnected, setDeviceConnected] = useState(false);

  useEffect(() => {
    setDeviceConnected(info.status === "connected");
  }, [info]);

  useEffect(() => {
    console.log(`webex info changed: ${JSON.stringify(webexInfo)}`);
  }, [webexInfo]);

  useEffect(() => {
    if (deviceConnected) {
      getDevices(webex, { serial: info.serialNumber }, true).then(() => {
        // history.push("/");
      });
    }
  }, [deviceConnected]);

  // Use useEffect to check the authorization status whenever 'expInt' changes
  useEffect(() => {
    const checkDeviceConnection = () => {
      console.log(`checkDeviceConnection: ${connectionConfigured}`);
      if (connectionConfigured) {
        getDeviceInfo(device, false);
      }
    };

    // Check authorization status initially and then every second (adjust as needed)
    checkDeviceConnection();
    const intervalId = setInterval(checkDeviceConnection, 10000);

    return () => {
      clearInterval(intervalId); // Cleanup when the component unmounts
    };
  }, [connectionConfigured]);

  function handleChange(event) {
    const { name, value } = event.target;
    deviceConnection({ ...connection, [name]: value });
    // console.log(`connection: ${JSON.stringify(connection)}`);
  }

  function handleSave(event) {
    event.preventDefault();
    deviceLogin(device).then(() => {
      //   history.push("/");
    });
  }

  return (
    <div>
      <DeviceLoginPage
        connection={connection}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
      />
      <hr />
      <DeviceInfo connection={connection} info={info} />
      <WebexInfo webexInfo={webexInfo} />
    </div>
  );
}

ManageDeviceLogin.propTypes = {
  device: PropTypes.object.isRequired,
  connection: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  webexInfo: PropTypes.object.isRequired,
  webex: PropTypes.object.isRequired,
  connectionConfigured: PropTypes.bool.isRequired,
  deviceLogin: PropTypes.func.isRequired,
  deviceConnection: PropTypes.func.isRequired,
  getDevices: PropTypes.func.isRequired,
  getDeviceInfo: PropTypes.func.isRequired,
  errors: PropTypes.object,
  //   history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    device: state.device,
    connection: state.device.connection,
    info: state.device.info,
    webexInfo: state.device.info.webexInfo,
    webex: state.webex,
    connectionConfigured: state.device.connectionConfigured,
  };
}

const mapDispatchToProps = {
  deviceLogin,
  deviceConnection,
  getDevices,
  getDeviceInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDeviceLogin);
