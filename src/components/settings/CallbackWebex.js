// CallbackPage.js

import React, { useEffect, useState } from "react";
import { webexLogin } from "../../redux/actions/webexActions";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMe } from "../../api/webexApi";

const CallbackWebex = ({ webexLogin, ...props }) => {
  const navigate = useNavigate();
  const [webex, setWebex] = useState({ ...props.webex }); //eslint-disable-line no-unused-vars

  useEffect(() => {
    // Extract the access token from the URL
    const urlParams = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = urlParams.get("access_token");
    const expDate = new Date(Date.now() + urlParams.get("expires_in") * 1000);
    const expires = expDate.toISOString();

    // Check if the access token is present
    if (accessToken) {
      // You have the access token; you can make API requests here
      console.log("Webex Access Token:", accessToken);
      webexLogin({ accessToken, expires });

      getMe({ accessToken }).then((response) => {
        console.log("Webex Me:", response);
      });

      // Redirect to a secure route or perform any other actions as needed
      navigate("/settings");
    } else {
      // Handle the case where no access token is found
      console.error("No access token found");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Webex Callback Page</h2>
      {/* You can display loading or processing information here */}
    </div>
  );
};

CallbackWebex.propTypes = {
  webex: PropTypes.object.isRequired,
  webexLogin: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    webex: state.webex,
  };
}

const mapDispatchToProps = {
  webexLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(CallbackWebex);
