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

    init(fileUrl, transformedDataFunc) {
        FinancialAnalytics.readJSONData(
            fileUrl,
            transformedDataFunc,
            FinancialAnalytics.writeFile
        );
    }

    static calculateMonthlySavings(data) {
        let monthlySavings = {};

        for (const month in data) {
            monthlySavings[month] = {};
            for (const category in data[month].incomes) {
                const income = data[month].incomes[category];
                const expenses = data[month].expenses[category];
                const totally =
                    income -
                    (expenses.food +
                        expenses.rent +
                        expenses.entertainment +
                        expenses.transportation);
                monthlySavings[month][category] = totally;
            }
        }
        return monthlySavings;
    }
    static compareMonthlyExpenses(data) {
        let monthlyExp = {};
        for (let monthly in data[1].expenses) {
            monthlyExp[monthly] = {};

            // const items = [food, rent, entertainment, transportation];
            for (let season in data[1].expenses[monthly]) {
                let maxExp = {
                    id: 1,
                    amount: data[1].expenses[monthly][season]
                };
                let minExp = {
                    id: 1,
                    amount: data[1].expenses[monthly][season]
                };

                for (let num in data) {
                    var expense = data[num].expenses[monthly][season];
                }
                if (expense > maxExp.amount) {
                    maxExp.id = monthly.id;
                    maxExp.amount = expense;
                }
                if (expense < minExp.amount) {
                    minExp.id = monthly.id;
                    minExp.amount = expense;
                }
                monthlyExp[monthly][season] = {
                    max: maxExp,
                    min: minExp
                };
            }
        }

        return monthlyExp;
    }
    static calculateAnnualExpenses(data) {
        let annualExp = {};
        for (let personId in data) {
            annualExp[personId] = {};
            for (const category in data[personId].expenses[
                Object.keys(data[personId].expenses)[0]
            ]) {
                let isTotal = 0;
                for (const month in data[personId].expenses) {
                    isTotal = +data[personId].expenses[month][category];
                }
                annualExp[personId][category] = isTotal;
            }
        }
        return annualExp;
    }
}
const analytics = new FinancialAnalytics();

analytics.init("data.json", FinancialAnalytics.compareMonthlyExpenses);

// // // console.log(data.readJSONData());
// console.log(FinancialAnalytics.calculateMonthlySavings());
// console.log(analytics.readJSONData());
