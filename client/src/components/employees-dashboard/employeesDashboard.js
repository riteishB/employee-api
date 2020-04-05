import React, { useState, useEffect } from "react";
import EmployeesTableComponent from "../employees-table/employeesTable";
import EmployeeAddComponent from "../employees-add/employeesAdd";
import { Spinner, Navbar } from "react-bootstrap";
import employeeService from "../../services/employeesService";
import "./employeesDashboard.css";

function EmployeeDashboardComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);

  const getEmployees = () => {
    employeeService.getEmployees().then(
      (result) => {
        setIsLoaded(true);
        setEmployees(result.data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  useEffect(() => {
    getEmployees();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Employees</Navbar.Brand>
        </Navbar>
        <div className="Content">
          <EmployeeAddComponent handler={getEmployees}></EmployeeAddComponent>
          <EmployeesTableComponent
            employees={employees}
            handler={getEmployees}
          ></EmployeesTableComponent>
        </div>
      </div>
    );
  }
}

export default EmployeeDashboardComponent;
