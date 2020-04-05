const Validator = require("jsonschema").Validator;
const employeeSchema = require("../schemas/employee");
const db = require("../database");

const v = new Validator();
let validationErrors = [];

const schemaValidator = (reqData) => {
  const errors = v
    .validate(reqData, employeeSchema)
    .errors.map((error) => error.stack);
  const validity = errors.length > 0 ? false : true;
  validationErrors = [...errors];
  return validity;
};

const roleValidator = (reqData) => {
  const ceoExists = db.getFromDatabaseWithKey("role", "CEO");
  if (ceoExists && reqData.role === "CEO") {
    validationErrors = [...validationErrors, "There can only be one CEO"];
    return false;
  }
  return true;
};

const dateValidator = (reqData) => {
  const currentDate = new Date();
  const hireDate = new Date(reqData.hireDate);
  if (hireDate > currentDate) {
    validationErrors = [
      ...validationErrors,
      "Hire date cannot be greater than current date",
    ];
    return false;
  }
  return true;
};

const validator = (reqData) => {
  if (!schemaValidator(reqData)) {
    return [false, validationErrors];
  }
  if (!roleValidator(reqData)) {
    return [false, validationErrors];
  }
  if (!dateValidator(reqData)) {
    return [false, validationErrors];
  }
  return [true, validationErrors];
};

module.exports = validator;
