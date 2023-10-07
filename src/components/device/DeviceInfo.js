import React from "react";
import PropTypes from "prop-types";
import DeviceLink from "./DeviceLink";

const DeviceInfo = ({ connection, info }) => {
  const deviceLink =
    info.status == "error" ? (
      <DeviceLink deviceIP={connection.ipAddress} />
    ) : (
      <></>
    );

  return (
    <div>
      <b>Device status</b>
      <div className="input-container">
        <label className="md-label element">Connection status</label>
        <label className="md-label element">
          {info.statusDescription} {deviceLink}
        </label>
      </div>
      <div className="input-container">
        <label className="md-label element">Model</label>
        <label className="md-label element">{info.model}</label>
      </div>
      <div className="input-container">
        <label className="md-label element">Serial number</label>
        <label className="md-label element">{info.serialNumber}</label>
      </div>
    </div>
  );
};

DeviceInfo.propTypes = {
  connection: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
};

export default DeviceInfo;
