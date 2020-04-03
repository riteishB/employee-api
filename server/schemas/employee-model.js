export const employeeSchema = {
  id: "/Employee",
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    hireDate: { type: "string" },
    role: {},
  },
  required: ["firstName", "lastName", "hireDate", "role"],
};
