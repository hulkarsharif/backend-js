import { Router } from "express";

import { rentalController } from "../controller/rental.controller.js";

const rentalRouter = Router();

rentalRouter.get("/", rentalController.getAllRentals);
rentalRouter.get("/:rentId", rentalController.getRentalById);
rentalRouter.post("/", rentalController.createRentals);
rentalRouter.put("/:rentId", rentalController.updatedRental);
rentalRouter.delete("/:rentId", rentalController.deleteRental);

export { rentalRouter };
