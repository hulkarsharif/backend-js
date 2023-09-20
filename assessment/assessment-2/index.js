import express from "express";
import { employeeRouter } from "./routes/employee.routes.js";

const app = express();
app.use(express.json());

const port = 7078;

app.use("/employees", employeeRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
