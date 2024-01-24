import React from "react";
import PropTypes from "prop-types";
import { Button } from "@momentum-ui/react";

const DeviceReset = ({ info, doDeviceReset }) => {
  const deviceReset = () => {
    doDeviceReset();
  };

  return (
    <div>
      {info.status === "connected" ? (
        <div>
          <b>Device restart</b>
          <div className="input-container">
            <Button
              type="submit"
              color="blue"
              ariaLabel="reset"
              onClick={deviceReset}
            >
              Restart Device
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

DeviceReset.propTypes = {
  info: PropTypes.object.isRequired,
  doDeviceReset: PropTypes.func.isRequired,
};

export default DeviceReset;
