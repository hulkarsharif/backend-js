import { rentalService } from "../services/rental.service.js";
import { sanitizedObj } from "../utils/sanitizedObj.js";
import { RENTAL_FIELDS } from "../const/allowedFields.js";

class RentalController {
    getAllRentals = (res, req) => {
        const rental = rentalService.getAllRentals();
        res.status(200).json({ data: rental });
    };

    getRentalById = (req, res) => {
        const rentalId = req.params.rentalId;
        const rental = rentalService.getAllRentals(rentalId);
        res.status(200).json({ data: rental });
    };
    createRentals = (req, res) => {
        const data = sanitizedObj(RENTAL_FIELDS, req.body);

        const rental = rentalService.createARentals(data);

        res.status(201).json({ data: rental });
    };
    updateRental = (req, res) => {
        const rentalId = req.params.rentalId;
        const data = sanitizedObj(RENTAL_FIELDS, req.body);
        const rental = rentalService.updateRental(rentalId, data);

        if (rental === "Error") {
            res.status(404).json({
                message: "Rental with provided ID does not exist"
            });
            return;
        }
        res.status(200).json({ data: rental });
    };

    deleteRental = (req, res) => {
        const rentalId = req.params.rentalId;
        const rental = rentalService.deleteRental(rentalId);
        res.status(204).send();
    };
}
export const rentalController = new RentalController();
