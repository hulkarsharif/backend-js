import { Router } from "express";
import { expensesController } from "../controllers/expense.controller.js";

const expensesRouter = new Router();

expensesRouter.get("/", expensesController.getAllExpenses);

export { expensesRouter };
