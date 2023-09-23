import { Router } from "express";

import { maintenanceController } from "../controller/maintenance.controller.js";

import { validationMiddleware } from "../middlewares/validation.middleware.js";

const maintenanceRouter = Router();
maintenanceRouter.get("/", maintenanceController.getAllMaintenances);
maintenanceRouter.get(
    "/:maintenanceId",
    validationMiddleware.validateMaintenanceId,
    maintenanceController.getMaintenanceById
);
maintenanceRouter.post("/", maintenanceController.createMaintenance);
maintenanceRouter.put(
    "/:maintenanceId",
    validationMiddleware.validateMaintenanceId,
    maintenanceController.updateMaintenance
);
maintenanceRouter.delete(
    "/:maintenanceId",
    validationMiddleware.validateMaintenanceId,
    maintenanceController.deleteMaintenance
);

export { maintenanceRouter };
