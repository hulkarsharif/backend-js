import { maintenances } from "../data.js";
import { v4 as uuid } from "uuid";

class MaintenanceService {
    getAllMaintenances() {
        return maintenances;
    }

    getMaintenanceById(maintenanceId) {
        return maintenances[maintenanceId];
    }

    createMaintenance(data) {
        const id = uuid();

        const maintenance = {
            id,
            ...data
        };
        maintenances[id] = maintenance;
        return maintenance;
    }

    updateMaintenance(maintenanceId, data) {
        const newMaintenance = maintenances[maintenanceId];

        if (newMaintenance) {
            maintenances[maintenanceId] = {
                ...maintenances[maintenanceId],
                ...data
            };
            return maintenances[maintenanceId];
        } else {
            return "Error";
        }
    }

    deleteMaintenance(maintenanceId) {
        if (maintenances[maintenanceId]) {
            delete maintenances[maintenanceId];
            return;
        }
        return "Error";
    }
}

export const maintenanceService = new MaintenanceService();
