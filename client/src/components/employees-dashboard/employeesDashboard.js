import React, { useState, useEffect } from "react";

function EmployeeDashboardComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/employees")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setEmployees(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [employees]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <ul>{JSON.stringify(employees)}</ul>;
  }
}

export default EmployeeDashboardComponent;
