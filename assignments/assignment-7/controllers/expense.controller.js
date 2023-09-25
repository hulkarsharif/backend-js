import { expensesService } from "../service/expense.service.js";
import { sanitizedObj } from "../utils/sanitizedObj.js";
import { EXPENSES_FIELDS } from "../const/allowfields.js";

class ExpensesController {
    getAllExpenses(req, res) {
        expensesService
            .getAllExpensess()
            .then((parsedData) => {
                res.status(200).json({ expenses: parsedData });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
    }
}
export const expensesController = new ExpensesController();
