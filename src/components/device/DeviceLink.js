import React from "react";
import PropTypes from "prop-types";

const DeviceLink = ({ deviceIP }) => {
  return (
    <>
      Verify{" "}
      <a href={`https://${deviceIP}`} target="_blank" rel="noopener noreferrer">
        device connection
      </a>{" "}
      and try again.
    </>
  );
};

DeviceLink.propTypes = {
  deviceIP: PropTypes.string.isRequired,
};

export default DeviceLink;
