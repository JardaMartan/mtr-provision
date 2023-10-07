import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import Provision from "./provision/Provision";
import Settings from "./settings/Settings";
import Device from "./device/Device";
import CallbackWebex from "./settings/CallbackWebex";
import CallbackO365 from "./settings/CallbackO365";
import "./common/SideBySideDiv.css";
import LogPage from "./log/LogPage";
import "@momentum-ui/core/css/momentum-ui.min.css";
import "@momentum-ui/icons/css/momentum-ui-icons.min.css";
// import AppTabs from "./common/AppTabs";

function App() {
  return (
    <div className="container">
      <div className="side-by-side left-div">
        {/* Content for the left div */}
        <Header />
        {/* <AppTabs /> */}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="device" element={<Device />} />
          <Route path="provision" element={<Provision />} />
          <Route path="settings" element={<Settings />} />
          <Route path="callbackwebex" element={<CallbackWebex />} />
          <Route path="callbacko365" element={<CallbackO365 />} />
          <Route element={<PageNotFound />} />
        </Routes>
      </div>
      <div className="side-by-side right-div">
        <LogPage />
      </div>
    </div>
  );
}

export default App;
