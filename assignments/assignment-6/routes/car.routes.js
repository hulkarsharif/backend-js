import { Router } from "express";

import { carController } from "../controller/car.controller.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";

const carRouter = Router();

carRouter.get("/", carController.getAllCars);
carRouter.get(
    "/:carId",
    validationMiddleware.validateCarId,
    carController.getCarById
);
carRouter.post("/", carController.createCars);
carRouter.put(
    "/:carId",
    validationMiddleware.validateCarId,
    carController.updatedCar
);
carRouter.delete(
    "/:carId",
    validationMiddleware.validateCarId,
    carController.deleteCar
);

export { carRouter };
