import { incomeRouter } from "./routes/income.routes.js";
import { expensesRouter } from "./routes/expense.routes.js";
import express from "express";

const app = express();
app.use(express.json());

const PORT = 4061;

app.use("/incomes", incomeRouter);
app.use("/expenses", expensesRouter);
// app.use("/expenses", expensesRouter);

app.listen(PORT, () => {
    console.log("Process is running on ", PORT);
});
