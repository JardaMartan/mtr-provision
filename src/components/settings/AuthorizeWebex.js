import React, { useState } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Authorization from "./Authorization";

const AuthorizeWebex = ({ ...props }) => {
  const apiConfig = require("../../api/webexConfig.json");
  const [webex, setWebex] = useState({ ...props.webex }); //eslint-disable-line no-unused-vars

  const handleLogin = () => {
    // Construct and redirect to the authorization URL
    const authorizationUrl =
      `https://webexapis.com/v1/authorize?` +
      `client_id=${encodeURIComponent(apiConfig.clientId)}&` +
      `scope=${encodeURIComponent(apiConfig.scope.join(" "))}&` +
      `response_type=token&` +
      `redirect_uri=${encodeURIComponent(apiConfig.redirecURI)}`;
    window.location.href = authorizationUrl;
  };

  return (
    <Authorization
      handleLogin={handleLogin}
      authorization={webex}
      name="Login to Webex"
      description="Webex authorization"
    />
  );
};

AuthorizeWebex.propTypes = {
  webex: propTypes.object.isRequired,
  errors: propTypes.object,
};

function mapStateToProps(state) {
  return {
    webex: state.webex,
  };
}

export default connect(mapStateToProps)(AuthorizeWebex);
