import { validate } from "uuid";

class ValidationMiddleware {
    validateCarId = (req, res, next) => {
        const { carId } = req.params;
        if (validate(carId)) {
            next();
            return;
        }
        res.status(400).json({ message: "Not a valid car ID" });
    };
    validateRentalId = (req, res, next) => {
        const { rentalId } = req.params;

        if (validate(rentalId)) {
            next();
            return;
        }
        res.status(400).json({ message: "Not a valid rental ID" });
    };
    validateMaintenanceId = (req, res, next) => {
        const { MaintenanceId } = req.params;

        if (validate(MaintenanceId)) {
            next();
            return;
        }
        res.status(400).json({ message: "Not a valid maintenance ID" });
    };
}

export const validationMiddleware = new ValidationMiddleware();
