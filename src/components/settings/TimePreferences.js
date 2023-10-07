import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateDevicePreferences } from "../../redux/actions/prefsActions";
// import SelectInput from "../common/SelectInput";
import * as dateTime from "../../constants/dateTime";
// import { ComboBox } from "@momentum-ui/react";
import { Select, SelectOption } from "@momentum-ui/react";

const TimePreferences = ({ updateDevicePreferences, preferences }) => {
  function handleTZChange(event) {
    const { name, value } = event[0]; //eslint-disable-line no-unused-vars
    updateDevicePreferences({
      timeZone: value,
    });
  }

  function handleDFChange(event) {
    const { name, value } = event[0]; //eslint-disable-line no-unused-vars
    updateDevicePreferences({
      dateFormat: value,
    });
  }

  function handleTFChange(event) {
    const { name, value } = event[0]; //eslint-disable-line no-unused-vars
    updateDevicePreferences({
      timeFormat: value,
    });
  }

  return (
    <div>
      <h5>Time Preferences</h5>
      <div className="input-container">
        <label className="md-label element">Time Zone</label>{" "}
        <Select
          defaultValue={preferences.timeZone}
          label="Time Zone"
          className="element"
          onSelect={handleTZChange}
        >
          {dateTime.TIME_ZONES.map((tz) => {
            return <SelectOption key={tz} value={tz} label={tz} />;
          })}
        </Select>
      </div>
      <div className="input-container">
        <label className="md-label element">Date Format</label>{" "}
        <Select
          defaultValue={preferences.dateFormat}
          label="Date Format"
          className="element"
          onSelect={handleDFChange}
        >
          {dateTime.DATE_FORMATS.map((dt) => {
            return <SelectOption key={dt} value={dt} label={dt} />;
          })}
        </Select>
      </div>
      <div className="input-container">
        <label className="md-label element">Time Format</label>{" "}
        <Select
          defaultValue={preferences.timeFormat}
          label="Time Format"
          className="element"
          onSelect={handleTFChange}
        >
          {dateTime.TIME_FORMATS.map((tm) => {
            return <SelectOption key={tm} value={tm} label={tm} />;
          })}
        </Select>
      </div>
    </div>
  );
};

TimePreferences.propTypes = {
  updateDevicePreferences: PropTypes.func.isRequired,
  preferences: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    preferences: state.preferences,
  };
}

const mapDispatchToProps = {
  updateDevicePreferences,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePreferences);
