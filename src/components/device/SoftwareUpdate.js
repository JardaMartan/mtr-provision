import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Select, SelectOption, Button } from "@momentum-ui/react";
import * as devicePrefs from "../../constants/devicePrefs";
import { setSwChannel } from "../../redux/actions/deviceActions";

const SoftwareUpdate = ({
  swChannel,
  setSwChannel,
  availableVersion,
  deviceUpdate,
}) => {
  const handleChangeChannel = (event) => {
    const { name, value } = event[0]; //eslint-disable-line no-unused-vars
    setSwChannel(value);
  };

  return (
    <div>
      <b>Software Update</b>
      <div className="input-container">
        <label className="md-label element">Software channel</label>
        <Select
          defaultValue={swChannel || devicePrefs.STABLE}
          id="mode"
          label="Mode"
          className="element"
          onSelect={handleChangeChannel}
        >
          {devicePrefs.SWCHANNEL_OPTIONS.map((channel) => {
            return (
              <SelectOption
                key={channel.value}
                value={channel.value}
                label={channel.label}
              />
            );
          })}
        </Select>
      </div>
      <div className="input-container">
        <label className="md-label element">Available version</label>
        <label className="md-label element">{availableVersion}</label>
      </div>
      <Button
        type="submit"
        color="blue"
        ariaLabel="update"
        onClick={deviceUpdate}
      >
        Update
      </Button>
    </div>
  );
};

SoftwareUpdate.propTypes = {
  swChannel: PropTypes.string.isRequired,
  setSwChannel: PropTypes.func.isRequired,
  availableVersion: PropTypes.string,
  deviceUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    swChannel: state.device.swChannel,
  };
};

const mapDispatchToProps = {
  setSwChannel: setSwChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoftwareUpdate);
