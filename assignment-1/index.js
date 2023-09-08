const fs = require("fs");

class FinancialAnalytics {
    static writeFile(fileUrl, data) {
        fs.writeFile(fileUrl, JSON.stringify(data), (err) => {
            if (err) {
                throw err;
            }
        });
    }

    static readJSONData(filename, dataCallback, writeCallback) {
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) throw err;

            const parseData = JSON.parse(data);
            const transformedData = dataCallback(parseData);
            writeCallback("newData.json", transformedData);
        });
    }
    // }
    // totalIncome(content) {
    //     const dataObj = content;
    //     let total = 0;
    //     for (const incomes in dataObj) {
    //         total += incomes;
    //         console.log(content);
    //     }
    // }

    static calculateMonthlySavings(data) {
        return [1, 2, 3, 4, 5];
    }
    init(fileUrl, transformedDataFunc) {
        FinancialAnalytics.readJSONData(
            fileUrl,
            transformedDataFunc,
            FinancialAnalytics.writeFile
        );
    }

    // calculateMonthlySavings(data) {
    //     let monthlySavings = {};

    //     for (const month in data) {
    //         monthlySavings[month] = {};
    //         for (const category in content[month].incomes) {
    //             const income = content[month].incomes[category];
    //             const expenses = content[month].expenses[category];
    //             const totally =
    //                 income -
    //                 (expenses.food +
    //                     expenses.rent +
    //                     expenses.entertainment +
    //                     expenses.transportation);
    //             monthlySavings[month][category] = totally;
    //         }
    //     }
    //     return monthlySavings;
    // }
    // compareMonthlyExpenses(data) {
    //     let monthlyExp = {};
    //     for (let monthly in data[1].expenses) {
    //         monthlyExp[monthly] = {};
    //         const items = [food, rent, entertainment, transportation];
    //         for (let k in items) {
    //             let maxExp = { id: 1, amount: data[1].expenses[monthly][k] };
    //             let minExp = { id: 1, amount: data[1].expenses[monthly][k] };
    //         }
    //     }
    // }
}
const analytics = new FinancialAnalytics();

analytics.init("data.json", FinancialAnalytics.calculateMonthlySavings);

// // console.log(data.readFile());
// // // console.log(data.readJSONData());
// console.log(FinancialAnalytics.calculateMonthlySavings());
// console.log(data.calculateMonthlySavings());
