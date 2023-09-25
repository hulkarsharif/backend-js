import { v4 as uuid } from "uuid";
import fs from "fs";

class ExpensesService {
    readFile() {
        const data = fs.promises.readFile("expenses.json", "utf-8");
        const dataObj = data.then((data) => {
            const parsedObj = JSON.parse(data);
            return parsedObj.expenses;
        });
        return dataObj;
    }
    writeFile(data) {
        return fs.promises.writeFile("expenses.json", JSON.stringify(data));
    }
    getAllExpenses() {
        return this.readFile();
    }
}

export const expensesService = new ExpensesService();
