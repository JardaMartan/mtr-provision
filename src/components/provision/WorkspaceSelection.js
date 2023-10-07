import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Select, SelectOption, Button } from "@momentum-ui/react";

const WorkspaceSelection = ({ workspaces, handleSelectWorkspace }) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  useEffect(() => {
    if (workspaces.length > 0) {
      setSelectedWorkspace(workspaces[0]);
    }
  }, [workspaces]);

  const handleSelect = (event) => {
    const { label, value } = event[0]; //eslint-disable-line no-unused-vars
    const workspace = workspaces.find((w) => w.id === value);
    setSelectedWorkspace(workspace);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSelectWorkspace(selectedWorkspace);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="md-label element">Select Workspace</label>{" "}
          <Select
            defaultValue={selectedWorkspace?.displayName}
            label="Select Workspace"
            className="element"
            onSelect={handleSelect}
          >
            {workspaces.map((workspace) => {
              return (
                <SelectOption
                  key={workspace.id}
                  value={workspace.id}
                  label={workspace.displayName}
                />
              );
            })}
          </Select>
        </div>
        <Button type="submit" color="blue" ariaLabel="generate code">
          Generate activation code
        </Button>
      </form>
    </div>
  );
};

WorkspaceSelection.propTypes = {
  workspaces: PropTypes.array.isRequired,
  handleSelectWorkspace: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    workspaces: state.workspaces,
  };
}

export default connect(mapStateToProps)(WorkspaceSelection);
