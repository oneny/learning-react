const Employee = require("../model/employees.json");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();

  if (!employees) return res.status(204).json({ "message": "No employees found. "});
  res.json(employees);
}

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res.status(400).json({ "message": "First and last names are required" });
  }

}