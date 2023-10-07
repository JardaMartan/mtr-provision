import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateDevicePreferences } from "../../redux/actions/prefsActions";
import LocalUser from "./LocalUser";

const PostDeploymentPreferences = ({ localUser, updateDevicePreferences }) => {
  const handleLocalUserChange = (event) => {
    const { name, value } = event.target;
    updateDevicePreferences({ localUser: { ...localUser, [name]: value } });
  };

  return (
    <div>
      <h4>Post-deployment device preferences</h4>
      <p>
        These settings will be applied to the device after it would have been
        registered.
      </p>
      <LocalUser onChange={handleLocalUserChange} localUser={localUser} />
      <p>Device template maybe in future.</p>
    </div>
  );
};

PostDeploymentPreferences.propTypes = {
  localUser: PropTypes.object.isRequired,
  updateDevicePreferences: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    localUser: state.preferences.localUser,
  };
}

const mapDispatchToProps = {
  updateDevicePreferences,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDeploymentPreferences);
