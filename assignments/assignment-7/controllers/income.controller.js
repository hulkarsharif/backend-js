import { incomeService } from "../service/income.service.js";
import fs from "fs";
// import { sanitizedObj } from "../utils/sanitizedObj.js";
// import { INCOMES_FIELDS } from "../const/allowfields.js";

class IncomeController {
    getAllIncomes(req, res) {
        incomeService
            .getAllIncomes()
            .then((parsedData) => {
                res.status(200).json({ incomes: parsedData });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
    }
    getIncomeById(req, res) {
        const incomeId = req.params.incomeId;
        const income = incomesService
            .getIncomeById(incomeId)
            .then((data) => {
                res.status(200).json({ income: data });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
        return income;
    }

    createIncomes(req, res) {
        incomeService
            .createIncomes(req.body)
            .then((newIncome) => {
                res.status(201).json({ data: newIncome });
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    }
    updateIncomeById(req, res) {
        const incomeId = req.params.incomeId;
        const incomes = incomeService
            .updateIncomeById(incomeId, req.body)
            .then((updatedIncome) => {
                res.status(200).json({ data: updatedIncome });
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
        return incomes;
    }
    deleteIncomeById(req, res) {
        const incomeId = req.params.incomeId;
        const income = incomeService
            .deleteIncomeById(incomeId)
            .then(() => {
                res.status(204).send();
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
        return income;
    }
}
export const incomeController = new IncomeController();
