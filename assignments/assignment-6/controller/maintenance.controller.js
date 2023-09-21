import { cars, maintenance } from "../data.js";
import { validate, v4 as uuid } from "uuid";

const API_KEY = "jkdfbgjh765478326578%%%@@@@bsdhfbdhjbbhvbdsfjhgc";

class MaintenanceController {
    getAllMaintenances = (req, res) => {
        const { headers } = req;
        if (headers.authorization) {
            const apiKeyParts = headers.authorization.split(" ");

            if (apiKeyParts[0] !== "Bearer" || apiKeyParts[1] !== API_KEY) {
                res.status(401).json({
                    message: "Not Valid API key"
                });
                return;
            }
        } else {
            res.status(400).json({
                message: "API key is missing"
            });
            return;
        }

        res.status(200).json({
            data: maintenance
        });
    };

    createMaintenance = (req, res) => {
        const { carId } = req.body;
        if (!validate(carId) || !cars[carId]) {
            return res
                .status(400)
                .json({ message: "Invalid customerId or productIds" });
        }
        const id = uuid();
        const maintenances = {
            id,
            ...data
        };
        maintenance[id] = maintenances;
        res.status(201).json({ data: maintenances });
    };

    getMaintenanceById = (req, res) => {
        const maintenanceId = req.params.maintenanceId;
        if (!validate(maintenanceId) || !maintenance[maintenanceId]) {
            return res
                .status(400)
                .json({ message: "Not a valid maintenance ID" });
        }
        res.status(200).json({ data: maintenance[maintenanceId] });
    };
    updatedMaintenance = (req, res) => {
        const maintenanceId = req.params.maintenanceId;
        const updatedData = req.body;
        if (!validate(maintenanceId) || !maintenance[maintenanceId]) {
            return res
                .status(400)
                .json({ message: "Not a valid maintenance ID" });
        }
        maintenance[maintenanceId] = {
            ...maintenance[maintenanceId],
            ...updatedData
        };
        res.status(200).json({ data: maintenance[maintenanceId] });
    };
    deleteMaintenance = (req, res) => {
        const maintenanceId = req.params.maintenanceId;
        if (!validate(maintenanceId) || !maintenance[maintenanceId]) {
            return res
                .status(400)
                .json({ message: "Not a valid maintenance ID" });
        }
        delete maintenance[maintenanceId];
        res.status(204).send();
    };
}
export const maintenanceController = new MaintenanceController();