import { Router } from "express";
import {
    getAllCars,
    createCars,
    getCarById,
    updatedCar,
    deleteCar
} from "../controller/car.controller.js";
import { carController } from "../controller/car.controller.js";

const carRouter = Router();

carRouter.get("/", carController, getAllCars);
carRouter.get("/:carId", carController, getCarById);
carRouter.post("/", carController, createCars);
carRouter.get("/:carId", carController, updatedCar);
carRouter.delete("/:carId", carController, deleteCar);

export { carRouter };
