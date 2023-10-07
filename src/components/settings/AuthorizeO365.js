import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Authorization from "./Authorization";

const AuthorizeO365 = (history, props) => {
  const apiConfig = require("../../api/o365Config.json");
  const [o365, setO365] = useState({ ...props.o365 }); //eslint-disable-line no-unused-vars
  const [errors, setErrors] = useState({}); // eslint-disable-line no-unused-vars

  const handleLogin = () => {
    // Construct and redirect to the authorization URL
    const authorizationUrl =
      `https://login.microsoftonline.com/${encodeURIComponent(
        apiConfig.tenantId
      )}/oauth2/v2.0/authorize?` +
      `client_id=${encodeURIComponent(apiConfig.clientId)}&` +
      `scope=${encodeURIComponent(apiConfig.scope.join(" "))}&` +
      `response_type=token&` +
      `redirect_uri=${encodeURIComponent(apiConfig.redirecURI)}`;
    window.location.href = authorizationUrl;
  };

  return (
    <Authorization
      handleLogin={handleLogin}
      authorization={o365}
      name="Login to O365"
      description="O365 authorization"
    />
  );
};

AuthorizeO365.propTypes = {
  o365: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    o365: state.o365,
  };
}

export default connect(mapStateToProps)(AuthorizeO365);
