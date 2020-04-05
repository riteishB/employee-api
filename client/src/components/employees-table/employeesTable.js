import React, { useState } from "react";
import { Alert, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import employeeService from "../../services/employeesService";
import EmployeeModalComponent from "../employee-modal/employeeModal";
import "./EmployeeTable.css";

function EmployeeTableComponent(props) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState();

  const handleClose = () => {
    setShow(false);
    setError();
  };
  const handleShow = (id) => {
    setIndex(id);
    setShow(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {};
    for (const field of event.target.elements) {
      if (field.id) {
        formData[field.id] = field.value;
      }
    }
    try {
      await employeeService.updateEmployee(
        props.employees[index]._id,
        formData
      );
      handleClose();
      await props.handler();
    } catch (err) {
      setError(err.response.data);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await employeeService.deleteEmployee(id);
      await props.handler();
    } catch (err) {
      setError("There was an error deleting employee data");
      setTimeout(() => {
        setError();
      }, 2000);
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover responsive>
        <col className="col-one"></col>
        <col className="col-two"></col>
        <col className="col-three"></col>
        <col className="col-four"></col>
        <col className="col-five"></col>
        <col className="col-six"></col>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Hire Date</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.employees.map((column, index) => (
            <tr key={index}>
              <td>{column._id}</td>
              <td>{column.firstName}</td>
              <td>{column.lastName}</td>
              <td>{column.hireDate}</td>
              <td>{column.role}</td>
              <td>
                <div className="Action-row">
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    onClick={() => handleShow(index)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={() => deleteEmployee(column._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EmployeeModalComponent
        show={show}
        error={error}
        title="Update employee"
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        formData={props.employees[index]}
      ></EmployeeModalComponent>
    </div>
  );
}

export default EmployeeTableComponent;
