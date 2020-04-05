import React, { useState } from "react";
import { Button } from "react-bootstrap";
import employeeService from "../../services/employeesService";
import EmployeeModalComponent from "../employee-modal/employeeModal";
import "./employeesAdd.css";

function EmployeeAddComponent(props) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState();

  const handleClose = () => {
    setShow(false);
    setError();
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {};
    for (const field of event.target.elements) {
      if (field.id) {
        formData[field.id] = field.value;
      }
    }
    try {
      await employeeService.addNewEmployee(formData);
      handleClose();
      await props.handler();
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="Add-button">
      <Button variant="primary" onClick={handleShow}>
        Add employee
      </Button>

      <EmployeeModalComponent
        show={show}
        error={error}
        title="Add a new employee"
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      ></EmployeeModalComponent>
    </div>
  );
}

export default EmployeeAddComponent;
