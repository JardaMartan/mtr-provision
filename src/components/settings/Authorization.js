import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@momentum-ui/react";

const Authorization = ({ handleLogin, authorization, name, description }) => {
  const [isAuthorized, setIsAuthorized] = useState(true); // Initially set to true
  const expInt = Date.parse(authorization.expires) || 0;
  const expDate = new Date(expInt);

  // Use useEffect to check the authorization status whenever 'expInt' changes
  useEffect(() => {
    const checkAuthorization = () => {
      const currentTime = Date.now();
      const isExpired = expInt < currentTime;
      setIsAuthorized(!isExpired); // Update 'isAuthorized' based on the condition
    };

    // Check authorization status initially and then every second (adjust as needed)
    checkAuthorization();
    const intervalId = setInterval(checkAuthorization, 1000);

    return () => {
      clearInterval(intervalId); // Cleanup when the component unmounts
    };
  }, [expInt]);

  const expiresLabel = (
    <>
      Expires:{" "}
      {expDate.toLocaleString("en-US", {
        hour12: false,
        dateStyle: "medium",
        timeStyle: "medium",
      })}
    </>
  );

  return (
    <div>
      <h4>{description}</h4>
      <p>
        Status:{" "}
        <label className={isAuthorized ? "" : "alert"}>
          {" "}
          {isAuthorized ? "authorized" : "unauthorized"}
        </label>
        {isAuthorized ? <>{expiresLabel}</> : <></>}
      </p>
      <Button onClick={handleLogin} color="blue" ariaLabel={name}>
        {name}
      </Button>
    </div>
  );
};

Authorization.propTypes = {
  authorization: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Authorization;
