import { Router } from "express";
import {
    getAllMaintenance,
    createMaintenance,
    getMaintenanceById,
    updatedMaintenance,
    deleteMaintenance
} from "../controller/maintenance.controller.js";
import { maintenanceController } from "../controller/maintenance.controller.js";

const maintenanceRouter = Router();

maintenanceRouter.get("/", maintenanceController, getAllMaintenance);
maintenanceRouter.get(
    "/:maintenanceId",
    maintenanceController,
    getMaintenanceById
);
maintenanceRouter.post("/", maintenanceController, createMaintenance);
maintenanceRouter.put(
    "/:maintenanceId",
    maintenanceController,
    updatedMaintenance
);
maintenanceRouter.delete(
    "/:maintenanceId",
    maintenanceController,
    deleteMaintenance
);

export { maintenanceRouter };
