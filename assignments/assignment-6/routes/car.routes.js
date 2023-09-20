import { Router } from "express";

import { carController } from "../controller/car.controller.js";

const carRouter = Router();

carRouter.get("/", carController.getAllCars);
carRouter.get("/:carId", carController.getCarById);
carRouter.post("/", carController.createCars);
carRouter.put("/:carId", carController.updatedCar);
carRouter.delete("/:carId", carController.deleteCar);

export { carRouter };
