import { incomeService } from "../services/income.service";
import { expensesService } from "../service/expense.service.js";
import { validate } from "uuid";

class ValidationMiddleware {
    validateIncomeId(req, res, next) {
        const { incomeId } = req.params;
        if (validate(incomeId)) {
            next();
            return;
        }
        res.status(400).json({ message: "Not a valid income ID" });
    }

    validateExpensesId(req, res, next) {
        const { expenseId } = req.params;
        if (validate(expenseId)) {
            next();
            return;
        }
        res.status(400).json({ message: "Not a valid expense ID" });
    }
}

export const validationMiddleware = new ValidationMiddleware();
