import { expensesService } from "../service/expense.service.js";

class ExpensesController {
    getAllExpenses(req, res) {
        expensesService
            .getAllExpenses()
            .then((parsedData) => {
                res.status(200).json({ expenses: parsedData });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
    }
    getExpenseById(req, res) {
        const expenseId = req.params.expenseId;
        const expense = expensesService
            .getExpenseById(expenseId)
            .then((data) => {
                res.status(200).json({ expense: data });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
        return expense;
    }
    createExpense(req, res) {
        expensesService
            .createExpense(req.body)
            .then((newExpense) => {
                res.status(201).json({ data: newExpense });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
    }
    updateExpenseById(req, res) {
        const expenseId = req.params.expenseId;

        const expense = expensesService
            .updateExpenseById(expenseId, req.body)
            .then((updatedExpense) => {
                res.status(200).json({ data: updatedExpense });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
        return expense;
    }
    deleteExpenseById(req, res) {
        const expenseId = req.params.expenseId;
        const expense = expensesService
            .deleteExpenseById(expenseId)
            .then(() => {
                res.status(204).send();
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
        return expense;
    }
}

export const expensesController = new ExpensesController();
