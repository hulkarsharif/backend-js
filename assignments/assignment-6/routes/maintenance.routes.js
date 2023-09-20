import { Router } from "express";

import { maintenanceController } from "../controller/maintenance.controller.js";

const maintenanceRouter = Router();

maintenanceRouter.get("/", maintenanceController.getAllMaintenances);
maintenanceRouter.get(
    "/:maintenanceId",
    maintenanceController.getMaintenanceById
);
maintenanceRouter.post("/", maintenanceController.createMaintenance);
maintenanceRouter.put(
    "/:maintenanceId",
    maintenanceController.updatedMaintenance
);
maintenanceRouter.delete(
    "/:maintenanceId",
    maintenanceController.deleteMaintenance
);

export { maintenanceRouter };
