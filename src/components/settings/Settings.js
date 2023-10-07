import React from "react";
import AuthorizeWebex from "./AuthorizeWebex";
// import AuthorizeO365 from "./AuthorizeO365";
import DevicePreferences from "./DevicePreferences";
import PostDeploymentPreferences from "./PostDeploymentPreferences";

const Settings = () => (
  <div>
    <h1>Settings</h1>
    <DevicePreferences />
    <hr />
    <PostDeploymentPreferences />
    <hr />
    <AuthorizeWebex />
    {/* <hr />
    <AuthorizeO365 /> */}
  </div>
);

export default Settings;
