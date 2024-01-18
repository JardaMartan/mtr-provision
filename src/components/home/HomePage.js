import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@momentum-ui/react";

const HomePage = () => (
  <div className="jumbotron">
    <h1>Webex Device Deployment</h1>
    <p>Deploy Cisco Webex Device to Webex Control Hub in RoomOS or MTR mode.</p>
    <Link to="device">
      <Button onClick={() => {}} color="blue">
        Device
      </Button>
    </Link>
  </div>
);

export default HomePage;
