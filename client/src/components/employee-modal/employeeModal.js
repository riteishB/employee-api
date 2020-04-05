import React from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";

function EmployeeModalComponent(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter first name"
              defaultValue={props.formData ? props.formData.firstName : ""}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter last name"
              defaultValue={props.formData ? props.formData.lastName : ""}
            />
          </Form.Group>

          <Form.Group controlId="hireDate">
            <Form.Label>Hire date</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="Enter hire date"
              defaultValue={props.formData ? props.formData.hireDate : ""}
            />
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              required
              defaultValue={props.formData ? props.formData.role : ""}
            >
              <option>CEO</option>
              <option>VP</option>
              <option>MANAGER</option>
              <option>LACKEY</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <br></br>
          {props.error && <Alert variant="danger">{props.error}</Alert>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmployeeModalComponent;
