import { Router } from "express";
import { employeeController } from "../controller/employee.controller.js";
import { validationMiddleware } from "../middlewares/employee.middleware.js";

const employeeRouter = Router();

employeeRouter.get("/", employeeController.getAllEmployee);
employeeRouter.get(
    "/:employeeId",
    validationMiddleware.validateEmployeeId,
    employeeController.getEmployeeById
);
employeeRouter.post("/", employeeController.createEmployee);
employeeRouter.put(
    "/:employeeId",
    validationMiddleware.validateEmployeeId,
    employeeController.updateEmployee
);
employeeRouter.delete(
    "/:employeeId",
    validationMiddleware.validateEmployeeId,
    employeeController.deleteEmployee
);

export { employeeRouter };
