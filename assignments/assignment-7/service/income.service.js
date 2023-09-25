import { v4 as uuid } from "uuid";
import fs from "fs";

class IncomeService {
    readFile() {
        const data = fs.promises.readFile("incomes.json", "utf-8");
        const dataObj = data.then((data) => {
            const parsedObj = JSON.parse(data);
            return parsedObj.incomes;
        });
        return dataObj;
    }

    writeFile(data) {
        return fs.promises.writeFile("incomes.json", JSON.stringify(data));
    }
    getAllIncomes() {
        return this.readFile();
    }
    getIncomeById(incomeId) {
        const income = this.readFile();
        const result = income.then((data) => {
            return data[incomeId];
        });
        return result;
    }

    createIncomes(data) {
        const incomes = this.readFile();
        return incomes.then((incomeObj) => {
            const id = uuid();
            const newIncome = {
                id,
                ...data
            };
            incomeObj[id] = newIncome;
            return this.writeFile({ incomes: incomeObj }).then(() => newIncome);
        });
    }
    updateIncomeById(incomeId, data) {
        const income = this.readFile();
        return income.then((incomeObj) => {
            if (incomeObj.hasProporty(incomeId)) {
                const updateIncome = {
                    ...incomeObj[incomeId],
                    ...data
                };
                incomeObj[incomeId] = updateIncome;
                return this.writeFile({ income: incomeObj }).then(
                    () => updateIncome
                );
            } else {
                return "Error";
            }
        });
    }

    deleteIncomeById(incomeId) {
        const income = this.readFile();
        return income.then((incomeObj) => {
            if (incomeObj.hasProporty(incomeId)) {
                delete incomeObj[incomeId];
                return this.writeFile({ incomes: incomesObj }).then(() => {
                    return "An income was deleted";
                });
            } else {
                return "Error";
            }
        });
    }
}
export const incomeService = new IncomeService();
