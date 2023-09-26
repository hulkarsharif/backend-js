import { Router } from "express";
import { expensesController } from "../controllers/expense.controller.js";
import { validationMiddleware } from "../middleware/middleware.js";

const expensesRouter = new Router();

expensesRouter.get("/", expensesController.getAllExpenses);
expensesRouter.get(
    "/:expenseId",
    validationMiddleware.validateExpenseId,
    expensesController.getExpenseById
);
expensesRouter.post("/", expensesController.createExpense);
expensesRouter.put(
    "/:expenseId",
    validationMiddleware.validateExpenseId,
    expensesController.updateExpenseById
);
expensesRouter.delete(
    "/:expenseId",
    validationMiddleware.validateExpenseId,
    expensesController.deleteExpenseById
);

export { expensesRouter };
