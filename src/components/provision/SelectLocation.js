import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Select, SelectOption } from "@momentum-ui/react";
import * as webexApi from "../../api/webexApi";

const SelectLocation = ({ onLocationChange, webex }) => {
  const [locations, setLocations] = useState([]);
  const [floors, setFloors] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [locationSelected, setLocationSelected] = useState(false);

  useEffect(() => {
    async function getLocations() {
      const locations = await webexApi.getLocations(webex);
      console.log("locations: " + JSON.stringify(locations));
      setLocations(locations.items);
    }
    getLocations();
  }, []);

  useEffect(() => {
    async function getFloors() {
      const floors = await webexApi.getLocationFloors(webex, selectedLocation);
      console.log("floors: " + JSON.stringify(floors));
      setFloors(floors.items);
      setSelectedFloor;
    }
    if (selectedLocation) {
      getFloors();
    }
  }, [selectedLocation, locationSelected]);

  useEffect(() => {
    onLocationChange(selectedLocation, selectedFloor);
  }, [selectedLocation, selectedFloor, onLocationChange]);

  function formatFloor(floor) {
    return floor.displayName.length > 0
      ? `${floor.displayName} (${floor.floorNumber})`
      : `${floor.floorNumber}`;
  }

  const handleLocationChange = (event) => {
    const { label, value } = event[0]; //eslint-disable-line no-unused-vars
    setSelectedLocation(value);
    setLocationSelected(true);
  };

  const handleFloorChange = (event) => {
    const { label, value } = event[0]; //eslint-disable-line no-unused-vars
    setSelectedFloor(value);
  };

  return (
    <div>
      <div className="container input-container">
        <label className="md-label element">Location</label>
        <Select
          defaultValue={selectedLocation}
          label="Location"
          className="element"
          onSelect={handleLocationChange}
        >
          {locations.map((loc) => {
            return (
              <SelectOption
                key={loc.id}
                value={loc.id}
                label={loc.displayName}
              />
            );
          })}
        </Select>
      </div>
      {locationSelected ? (
        <div className="container input-container">
          <label className="md-label element">Floor</label>
          <Select
            defaultValue={selectedFloor}
            label="Floor"
            className="element"
            onSelect={handleFloorChange}
          >
            {floors.map((floor) => {
              return (
                <SelectOption
                  key={floor.id}
                  value={floor.id}
                  label={formatFloor(floor)}
                />
              );
            })}
          </Select>
        </div>
      ) : null}
    </div>
  );
};

SelectLocation.propTypes = {
  webex: PropTypes.object.isRequired,
  onLocationChange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    webex: state.webex,
  };
}

export default connect(mapStateToProps)(SelectLocation);
