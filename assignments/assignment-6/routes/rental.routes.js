import { Router } from "express";
import { rentalController } from "../controller/rental.controller.js";

import { validationMiddleware } from "../middlewares/validation.middleware.js";

const rentalRouter = Router();

rentalRouter.get("/", rentalController.getAllRentals);
rentalRouter.get(
    "/:rentalId",
    validationMiddleware.validateRentalId,
    rentalController.getRentalById
);
rentalRouter.post(
    "/",
    // validationMiddleware.validateCarIdsInBody,
    rentalController.createRental
);
rentalRouter.put(
    "/:rentalId",
    validationMiddleware.validateRentalId,
    rentalController.updateRental
);
rentalRouter.delete(
    "/:rentalId",
    validationMiddleware.validateRentalId,
    rentalController.deleteRental
);

export { rentalRouter };
