import { Router } from "express";
import { incomeController } from "../controllers/income.controller.js";

const incomeRouter = new Router();

incomeRouter.get("/", incomeController.getAllIncomes);
incomeRouter.get("/:incomeId", incomeController.getIncomeById);
incomeRouter.post("/", incomeController.createIncomes);
incomeRouter.put("/:incomeId", incomeController.updateIncomeById);
incomeRouter.delete("/:incomeId", incomeController.deleteIncomeById);

export { incomeRouter };
