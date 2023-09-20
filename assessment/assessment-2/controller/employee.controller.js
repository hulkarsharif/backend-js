import { employeeService } from "../service/employee.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { EMPLOYEE_FIELDS } from "../const/allowedFields.js";

class EmployeeController {
    getAllEmployee = (req, res) => {
        const employees = employeeService.getAllEmployee();
        res.status(200).json({ data: employees });
    };

    getEmployeeById = (req, res) => {
        const employeeId = req.params.employeeId;
        const employee = employeeService.getEmployeeById(employeeId);
        res.status(200).json({ data: employee });
    };

    createEmployee = (req, res) => {
        const data = sanitizedObj(EMPLOYEE_FIELDS, req.body);
        const employee = employeeService.createEmployee(data);
        res.status(201).json({ data: employee });
    };

    updateEmployee = (req, res) => {
        const employeeId = req.params.employeeId;

        const data = sanitizedObj(EMPLOYEE_FIELDS, req.body);
        const employee = employeeService.updateEmployee(employeeId, data);

        if (employee === "Error") {
            res.status(404).json({
                message: "Car with provided ID does not exist"
            });
            return;
        }
        res.status(200).json({ data: employee });
    };

    deleteEmployee = (req, res) => {
        const employeeId = req.params.employeeId;
        const employee = employeeService.deleteEmployee(employeeId);
        res.status(204).send();
    };
}

export const employeeController = new EmployeeController();
