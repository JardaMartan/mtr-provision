import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@momentum-ui/react";

const HomePage = () => (
  <div className="jumbotron">
    <h1>MTR Device Administration</h1>
    <p>Deploy Cisco Video Device for MTR.</p>
    <Link to="device">
      <Button onClick={() => {}} color="blue">
        Device
      </Button>
    </Link>
  </div>
);

export default HomePage;
