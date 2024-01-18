import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateDevicePreferences } from "../../redux/actions/prefsActions";
import { ToggleSwitch, Select, SelectOption } from "@momentum-ui/react";
import * as language from "../../constants/language";

const OtherPreferences = ({ updateDevicePreferences, preferences }) => {
  function handleLanguageChange(event) {
    const { name, value } = event[0]; //eslint-disable-line no-unused-vars
    updateDevicePreferences({
      language: value,
    });
  }

  function handleCloseInitialWizardChange(event) {
    const value = event.target.checked;
    updateDevicePreferences({
      closeInitialWizard: value,
    });
  }

  function handleInstallMTRChange(event) {
    const value = event.target.checked;
    updateDevicePreferences({
      installMTR: value,
    });
  }

  return (
    <div>
      <h5>Other Preferences</h5>
      <div className="input-container">
        <label className="md-label element">Language</label>
        <Select
          defaultValue={preferences.language}
          label="Language"
          className="element"
          onSelect={handleLanguageChange}
        >
          {language.LANGUAGES.map((lang) => {
            return <SelectOption key={lang} value={lang} label={lang} />;
          })}
        </Select>
      </div>
      <ToggleSwitch
        // defaultChecked={true}
        checked={preferences.closeInitialWizard}
        onChange={handleCloseInitialWizardChange}
        htmlId="close-wizard"
        name="close-wizard"
        label="Close initial wizard after deployment"
      />
      <ToggleSwitch
        // defaultChecked={false}
        checked={preferences.installMTR}
        onChange={handleInstallMTRChange}
        htmlId="install-mtr"
        name="install-mtr"
        label="Install MTR software"
      />
    </div>
  );
};

OtherPreferences.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherPreferences);
