import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@momentum-ui/react";

const CheckWebexAuthorization = () => {
  return (
    <div>
      <Link to="../settings">
        <Button
          onClick={() => {}}
          color="blue"
          ariaLabel="check webex authorization"
        >
          Check Webex authorization
        </Button>
      </Link>
    </div>
  );
};

export default CheckWebexAuthorization;
