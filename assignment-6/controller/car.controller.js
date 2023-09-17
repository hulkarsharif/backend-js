import { cars } from "../data.js";
import { validate, v4 as uuid } from "uuid";

const API_KEY = "jkdfbgjh765478326578$%^&^%^&$^%$%^$%^$";

class CarController {
    getAllCars = (res, req) => {
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
        const allCars = Object.values(cars);
        res.status(200).json({ data: allCars });
    };

    createCars = (req, res) => {
        const data = req.body;
        const id = uuid();
        const car = {
            id,
            ...data
        };
        cars[id] = car;
        res.status(201).json({ data: car });
    };
    getCarById = (req, res) => {
        const carId = req.params.carId;
        if (!validate(carId) || !cars[carId]) {
            return res.status(400).json({ message: "Not a valid car ID" });
        }
        res.status(200).json({ data: cars[carId] });
    };

    updatedCar = (req, res) => {
        const carId = req.params.carId;
        const updatedData = req.body;
        if (!validate(carId) || !cars[carId]) {
            return res.status(400).json({ message: "Not a valid cars ID" });
        }
        cars[carId] = { ...cars[carId], ...updatedData };
        res.status(200).json({ data: cars[carId] });
    };

    deleteCar = (req, res) => {
        const carId = req.params.carId;
        if (!validate(carId) || !cars[carId]) {
            return res.status(400).json({ message: "Not a valid customer ID" });
        }
        delete cars[carId];
        res.status(204).send();
    };
}
export const carController = new CarController();
