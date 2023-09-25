import { carService } from "../services/car.service.js";
import { sanitizedObj } from "../utils/sanitizedObj.js";
import { CAR_FIELDS } from "../const/allowedFields.js";

const API_KEY = "jkdfbgjh765478326578$%^&^%^&$^%$%^$%^$";

class CarController {
    getAllCars = (req, res) => {
        const cars = carService.getAllCars();
        // if (headers.authorization) {
        //     const apiKeyParts = headers.authorization.split(" ");

        //     if (apiKeyParts[0] !== "Bearer" || apiKeyParts[1] !== API_KEY) {
        //         res.status(401).json({
        //             message: "Not Valid API key"
        //         });
        //         return;
        //     }
        // } else {
        //     res.status(400).json({
        //         message: "API key is missing"
        //     });
        //     return;
        // }

        res.status(200).json({
            data: cars
        });
    };

    createCars = (req, res) => {
        const data = sanitizedObj(CAR_FIELDS, req.body);
        const car = carService.createCars(data);
        res.status(200).json({ data: car });
    };
    getCarById = (req, res) => {
        const carId = req.params.carId;
        const car = carService.getCarById(carId);
        res.status(200).json({ data: car });
    };

    updatedCar = (req, res) => {
        const carId = req.params.carId;
        const data = sanitizedObj(CAR_FIELDS, req.body);
        const car = carService.getCarById(data);

        if (car === "Error") {
            res.status(404).json({
                message: "Car with provided ID does not exist"
            });
            return;
        }
        res.status(200).json({ data: car });
    };

    deleteCar = (req, res) => {
        const carId = req.params.carId;
        const car = carService.deleteCar(carId);
        res.status(204).send();
    };
}
export const carController = new CarController();
