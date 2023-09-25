import { promises as fs } from "fs";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

app.use("/incomes", incomesRouter);
app.use("/expenses", expensesRouter);

app.listen(PORT, () => {
    console.log("Process is running on ", PORT);
});
