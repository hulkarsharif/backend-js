import express from "express";

import {
    customerRouter,
    orderRouter,
    productRouter
} from "./routes/customer.route.js";

const app = express();
app.use(express.json());

const PORT = 6060;

app.use("/customers", customerRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
