import React from "react";
import { Tab, TabContent, TabList, TabPane, Tabs } from "@momentum-ui/react";
import Device from "../device/Device";
import Provision from "../provision/Provision";
import Settings from "../settings/Settings";

export default function AppTabs() {
  return (
    <Tabs tabType="tabs">
      <TabList>
        <Tab heading="Device" />
        <Tab heading="Provisioning" />
        <Tab heading="Settings" />
      </TabList>
      <TabContent>
        <TabPane>
          <Device />
        </TabPane>
        <TabPane>
          <Provision />
        </TabPane>
        <TabPane>
          <Settings />
        </TabPane>
      </TabContent>
    </Tabs>
  );
}

/*
export default function AppTabs() {
  return (
    <>
      <div className="md-tab md-tab--pills" type="pills">
        <ul className="md-tab__list" role="tab">
          <li className="md-tab__item active">
            <a role="tab" href="/device" aria-current="true">
              Device
            </a>
          </li>
          <li className="md-tab__item">
            <a role="tab" href="/provision" aria-current="false">
              Provision
            </a>
          </li>
          <li className="md-tab__item">
            <a role="tab" href="/settings" aria-current="false">
              Settings
            </a>
          </li>
        </ul>
        <div className="md-tab__content">
          <div className="md-tab__pane active">
            <div className="md-tab__content">Testing 1</div>
          </div>
          <div className="md-tab__pane">
            <div className="md-tab__content">Testing 2</div>
          </div>
          <div className="md-tab__pane">
            <div className="md-tab__content">Testing 3</div>
          </div>
        </div>
      </div>
    </>
  );
}*/
