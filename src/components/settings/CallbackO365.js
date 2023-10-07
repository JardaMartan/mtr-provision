// CallbackPage.js

import React, { useEffect, useState } from "react";
import { o365Login } from "../../redux/actions/o365Actions";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CallbackO365 = ({ o365Login, ...props }) => {
  const navigate = useNavigate();
  const [o365, setO365] = useState({ ...props.o365 }); //eslint-disable-line no-unused-vars

  useEffect(() => {
    // Extract the access token from the URL
    const urlParams = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = urlParams.get("access_token");
    const expDate = new Date(Date.now() + urlParams.get("expires_in") * 1000);
    const expires = expDate.toISOString();

    // Check if the access token is present
    if (accessToken) {
      // You have the access token; you can make API requests here
      console.log("O365 Access Token:", accessToken);
      o365Login({ accessToken, expires });
      navigate("/settings");
    } else {
      // Handle the case where no access token is found
      console.error("No access token found");
    }
  }, [navigate]);

  return (
    <div>
      <h2>O365 Callback Page</h2>
      {/* You can display loading or processing information here */}
    </div>
  );
};

CallbackO365.propTypes = {
  o365: PropTypes.object.isRequired,
  o365Login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    o365: state.o365,
  };
}

const mapDispatchToProps = {
  o365Login,
};

export default connect(mapStateToProps, mapDispatchToProps)(CallbackO365);
