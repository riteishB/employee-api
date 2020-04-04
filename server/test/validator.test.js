const validator = require("../src/helpers/validator");

test("should be true if data matches the schema", () => {
  const mockData = {
    _id: "1",
    firstName: "abc",
    lastName: "xyz",
    hireDate: "2010-04-12",
    role: "LACKEY",
  };
  const validation = validator(mockData);
  expect(validation).toBe(true);
});

test("should be false if data does not match the schema", () => {
  const mockData = {
    _id: "1",
    firstName: "abc",
    lastName: "",
    hireDate: "2010-04-12",
    role: "LACKEY",
  };
  const validation = validator(mockData);
  expect(validation).toBe(false);
});

test("should be false if data does not match the schema", () => {
  const mockData = {
    _id: "1",
    firstName: "abc",
    lastName: "xyz",
    hireDate: "2010-04",
    role: "LACKEY",
  };
  const validation = validator(mockData);
  expect(validation).toBe(false);
});
