import { rentals } from "../data.js";
import { validate, v4 as uuid } from "uuid";

class RentalController {
    getAllRentals = (res, req) => {
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
        const rentals = Object.values(rentals);
        res.status(200).json({ data: rentals });
    };
    createRentals = (req, res) => {
        const data = req.body;
        const id = uuid();
        const rent = {
            id,
            ...data
        };
        rentals[id] = rent;
        if (!rentals[rent.rentId]) {
            res.status(400).json({ error: "Car not found" });
            return;
        }
    };
    getRentalById = (req, res) => {
        const rentId = req.params.rentId;
        if (!validate(rentId) || !rentals[rentId]) {
            return res.status(400).json({ message: "Not a valid rental ID" });
        }
        res.status(200).json({ data: rentals[rentId] });
    };
    updatedRental = (req, res) => {
        const rentId = req.params.rentId;
        const updatedData = req.body;
        if (!validate(rentId) || !rentals[rentId]) {
            return res.status(400).json({ message: "Not a valid rentals ID" });
        }
        rentals[rentId] = { ...rentals[rentId], ...updatedData };
        res.status(200).json({ data: rentals[rentId] });
    };
    deleteRental = (req, res) => {
        const rentId = req.params.rentId;
        if (!validate(rentId) || !rentals[rentId]) {
            return res.status(400).json({ message: "Not a valid rental ID" });
        }
        delete rentals[rentId];
        res.status(204).send();
    };
}
export const rentalController = new RentalController();
