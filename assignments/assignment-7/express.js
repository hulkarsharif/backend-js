import { incomeRouter } from "./routes/income.routes.js";
import express from "express";

const app = express();
app.use(express.json());

const PORT = 4080;

app.use("/incomes", incomeRouter);
// app.use("/expenses", expensesRouter);

app.listen(PORT, () => {
    console.log("Process is running on ", PORT);
});
