import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@momentum-ui/react";
import SelectLocation from "./SelectLocation";
import PropTypes from "prop-types";

const CreateWorkspace = ({ createWorkspace }) => {
  const [showModal, setShowModal] = React.useState(false);
  const modalRef = React.useRef(null);
  const [workspaceName, setWorkspaceName] = React.useState("");
  const [locationId, setLocationId] = React.useState("");
  const [floorId, setFloorId] = React.useState("");

  const onChange = (e) => {
    setWorkspaceName(e.target.value);
  };

  const onLocationChange = (locId, flrId) => {
    setLocationId(locId);
    setFloorId(flrId);
  };

  const onClose = () => {
    modalRef.current.closeModal();
    setWorkspaceName("");
    setLocationId("");
    setFloorId("");
  };

  return (
    <div>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        ariaLabel="Create Workspace"
        color="blue"
        id="create-workspace"
      >
        Create Workspace
      </Button>
      <Modal
        applicationId="app"
        onHide={() => {
          setShowModal(false);
        }}
        show={showModal}
        ref={modalRef}
        htmlId="createWorkspaceModal"
        size="small"
        backdropClickExit
      >
        <ModalHeader headerLabel="Create Workspace" showCloseButton />
        <ModalBody>
          <div className="container input-container">
            <label className="md-label element">Workspace name</label>{" "}
            <input
              type="text"
              name="workspaceName"
              className="md-input element"
              value={workspaceName}
              onChange={onChange}
            />
          </div>
          <SelectLocation onLocationChange={onLocationChange} />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              onClose();
            }}
            ariaLabel="Close Modal"
            color="default"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              createWorkspace(workspaceName, locationId, floorId);
              onClose();
            }}
            ariaLabel="Submit Form"
            color="blue"
          >
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

CreateWorkspace.propTypes = {
  createWorkspace: PropTypes.func.isRequired,
};

export default CreateWorkspace;
