import React from "react";
import PropTypes from "prop-types";
import * as proxyModes from "../../constants/proxyModes";

const ProxyInput = ({ onChange, proxyPrefs }) => {
  let result;
  switch (proxyPrefs.mode) {
    case (proxyModes.OFF, proxyModes.WPAD):
      return <></>;
    case proxyModes.MANUAL:
      result = (
        <>
          <div className="input-container">
            <label className="md-label element">Host</label>{" "}
            <input
              type="text"
              name="host"
              className="md-input element"
              value={proxyPrefs.host}
              onChange={onChange}
            />
          </div>
          <div className="input-container">
            <label className="md-label element">Port</label>
            <input
              type="text"
              name="port"
              className="md-input element"
              value={proxyPrefs.port}
              onChange={onChange}
            />
          </div>
        </>
      );
      break;
    case proxyModes.PAC_URL:
      result = (
        <div className="input-container">
          <label className="md-label element">PAC URL</label>{" "}
          <input
            type="text"
            name="pacUrl"
            className="md-input element"
            value={proxyPrefs.pacUrl}
            onChange={onChange}
          />
        </div>
      );
      break;
    default:
      return <></>;
  }

  return <div>{result}</div>;
};

ProxyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  proxyPrefs: PropTypes.object.isRequired,
};

export default ProxyInput;
