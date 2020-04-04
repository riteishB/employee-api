const employeeSchema = {
  id: "/Employee",
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 1 },
    lastName: { type: "string", minLength: 1 },
    hireDate: { type: "string", format: "date" },
    role: {
      type: "string",
      minLength: 1,
      enum: ["CEO", "VP", "MANAGER", "LACKEY"],
    },
  },
  required: ["firstName", "lastName", "hireDate", "role"],
};

module.exports = employeeSchema;
