import fs from "fs";
import { v4 as uuid } from "uuid";
// import { employeeData } from "../employee.json";
// const employeeData = require("../employee.json");

class EmployeeService {
    readParseAll() {
        const content = fs.readFileSync("../employee.json", "utf-8");
        const parseData = JSON.parse(content);
        const employees = parseData.employees;
        return employees;
    }
    updateAll(data) {
        fs.writeFileSync(employeeData, Json.stringify(data));
    }

    getAllEmployee() {
        const content = this.readParseAll();
        return content;
    }
    createEmployee(data) {
        const content = this.readParseAll();
        const id = uuid();
        const employee = {
            id,
            ...data
        };
        content.push(employee);
        this.updateAll(content);
        return employee;
    }

    getEmployeeById(employeeId) {
        const content = this.readParseAll();
        for (const employee of content) {
            return employee[employeeId];
        }
    }

    updateEmployee(employeeId, data) {
        const content = this.readParseAll();

        for (const employee of content) {
            if (employee[employeeId]) {
                employee[employeeId] = { ...employee[employeeId], ...data };
                return employee[employeeId];
            } else {
                return "Error";
            }
        }
        this.updateAll(content);
    }

    deleteEmployee(employeeId) {
        const content = this.readParseAll();
        content = content.filter((employee) => employee.id !== employeeId);
        return content;
    }
}

export const employeeService = new EmployeeService();
