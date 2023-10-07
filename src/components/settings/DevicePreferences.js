import React from "react";
// import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateDevicePreferences } from "../../redux/actions/prefsActions";
// import SelectInput from "../common/SelectInput";
import { Select, SelectOption } from "@momentum-ui/react";
import ProxyInput from "./ProxyInput";
import * as proxyModes from "../../constants/proxyModes";
import TimePreferences from "./TimePreferences";
import OtherPreferences from "./OtherPreferences";

const DevicePreferences = ({
  updateDevicePreferences,
  proxy,
  ...props //eslint-disable-line no-unused-vars
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateDevicePreferences({ proxy: { ...proxy, [name]: value } });
  };

  const handleChangeMode = (event) => {
    const { name, value } = event[0]; //eslint-disable-line no-unused-vars
    updateDevicePreferences({ proxy: { ...proxy, mode: value } });
  };

  return (
    <div>
      <h4>Pre-deployment device preferences</h4>
      <p>
        Configure the initial device preferences that are needed before starting
        the deployment.
      </p>
      <h5>HTTP Proxy Settings</h5>
      <div className="input-container">
        <label className="md-label element">Mode</label>
        <Select
          defaultValue={proxy.mode || proxyModes.OFF}
          id="mode"
          label="Mode"
          className="element"
          onSelect={handleChangeMode}
        >
          {proxyModes.PROXY_MODES_OPTIONS.map((mode) => {
            return (
              <SelectOption
                key={mode.value}
                value={mode.value}
                label={mode.label}
              />
            );
          })}
        </Select>
      </div>
      <p />
      <ProxyInput onChange={handleInputChange} proxyPrefs={proxy} />
      <p />
      <br />
      <TimePreferences />
      <br />
      <OtherPreferences />
    </div>
  );
};

DevicePreferences.propTypes = {
  preferences: PropTypes.object.isRequired,
  proxy: PropTypes.object.isRequired,
  localUser: PropTypes.object.isRequired,
  updateDevicePreferences: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    preferences: state.preferences,
    proxy: state.preferences.proxy,
    localUser: state.preferences.localUser,
  };
}

const mapDispatchToProps = {
  updateDevicePreferences,
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicePreferences);
