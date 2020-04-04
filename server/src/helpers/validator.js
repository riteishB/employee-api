const Validator = require("jsonschema").Validator;
const employeeSchema = require("../schemas/employee");
const db = require("../database");

const v = new Validator();

const schemaValidator = (reqData) => {
  const validity =
    v.validate(reqData, employeeSchema).errors.map((error) => error.stack)
      .length > 0
      ? false
      : true;
  return validity;
};

const roleValidator = (reqData) => {
  const ceoExists = db.getFromDatabaseWithKey("role", "CEO");
  if (ceoExists && reqData.role === "CEO") {
    return false;
  }
  return true;
};

const validator = (reqData) => {
  // validate the schema first
  if (!schemaValidator(reqData)) {
    return false;
  }
  if (!roleValidator(reqData)) {
    return false;
  }
  return true;
};

module.exports = validator;
