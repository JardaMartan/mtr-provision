import React from "react";
import PropTypes from "prop-types";

const WebexInfo = ({ webexInfo }) => {
  return (
    <div>
      <b>Webex device status</b>
      <div className="input-container">
        <label className="md-label element">Name</label>
        <label className="md-label element">{webexInfo.displayName}</label>
      </div>
      <div className="input-container">
        <label className="md-label element">Connection status</label>
        <label className="md-label element">{webexInfo.connectionStatus}</label>
      </div>
      <div className="input-container">
        <label className="md-label element">Software</label>
        <label className="md-label element">{webexInfo.software}</label>
      </div>
      <div className="input-container">
        <label className="md-label element">Serial number</label>
        <label className="md-label element">{webexInfo.serial}</label>
      </div>
    </div>
  );
};

WebexInfo.propTypes = {
  webexInfo: PropTypes.object.isRequired,
};

export default WebexInfo;
