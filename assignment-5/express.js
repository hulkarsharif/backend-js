import express from "express";
import { customers, products, orders } from "./data.js";
import { validate, v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

const PORT = 4030;

app.get("/customers", (res) => {
    const customerOrder = Object.values(customers);
    res.status(200).json({ data: customerOrder });
});

app.get("/customers/:customrId", (req, res) => {
    const customrId = req.params.customrId;
    if (!validate(customrId) || !customers[customrId]) {
        return res.status(400).json({ message: "Not a valid customers ID" });
    }
    res.status(200).json({ data: customers[customrId] });
});

app.post("/customers", (req, res) => {
    const data = req.body;
    const id = uuid();
    const customer = {
        id,
        ...data
    };
    customers[id] = customer;
    res.status(201).json({ data: customer });
});

app.put("/customers/:customerId", (req, res) => {
    const customerId = req.params.customerId;
    const updatedData = req.body;
    if (!validate(customerId) || !customers[customerId]) {
        return res.status(400).json({ message: "Not a valid customers ID" });
    }
    customers[customerId] = { ...customers[customerId], ...updatedData };
    res.status(200).json({ data: customers[customerId] });
});

app.delete("/customers/:customerId", (req, res) => {
    const customerId = req.params.customerId;
    if (!validate(customerId) || !customers[customerId]) {
        return res.status(400).json({ message: "Not a valid customer ID" });
    }
    delete customers[customerId];
    res.status(204).send();
});

//=====================//

app.get("/products", (req, res) => {
    const productObj = Object.values(productObj);
    res.status(200).json({ data: productObj });
});

app.get("/products/:productId", (req, res) => {
    const productId = req.params.productId;
    if (!validate(productId) || !products[productId]) {
        return res.status(400).json({ message: "Not a valid products ID" });
    }
    res.status(200).json({ data: products[productId] });
});

app.post("/products", (req, res) => {
    const data = req.body;
    const id = uuid();
    const product = {
        id,
        ...data
    };
    products[id] = product;
    res.status(201).json({ data: product });
});

app.put("/products/:productId", (req, res) => {
    const productId = req.params.productId;
    const updatedData = req.body;
    if (!validate(productId) || !products[productId]) {
        return res.status(400).json({ message: "Not a valid products ID" });
    }
    products[productId] = { ...products[productId], ...updatedData };
    res.status(200).json({ data: products[productId] });
});

app.delete("/products/:productsId", (req, res) => {
    const productsId = req.params.productsId;

    if (!validate(productsId) || !products[productsId]) {
        return res.status(400).json({ message: "Not a valid products ID" });
    }

    delete products[productsId];

    res.status(204).send();
});

//--------------------------//

app.get("/orders", (res) => {
    const orderIt = Object.values(orderIt);
    res.status(200).json({ data: orderIt });
});

app.get("/orders/:orderId", (req, res) => {
    const orderId = req.params.orderId;
    if (!validate(orderId) || !orders[orderId]) {
        return res.status(400).json({ message: "Not a valid orders ID" });
    }
    res.status(200).json({ data: orders[orderId] });
});

app.post("/orders", (req, res) => {
    const { customerId, productIds } = req.body;
    if (
        !validate(customerId) ||
        !customers[customerId] ||
        !Array.isArray(productIds) ||
        productIds.some(
            (productId) => !validate(productId) || !products[productId]
        )
    ) {
        return res
            .status(400)
            .json({ message: "Invalid customerId or productIds" });
    }
    const id = uuid;
    const order = {
        id,
        customerId,
        productIds
    };
    orders[id] = order;
    res.status(201).json({ data: order });
});

app.put("/orders/:orderId", (req, res) => {
    const orderId = req.params.orderId;
    const updatedData = req.body;
    if (!validate(orderId) || !orders[orderId]) {
        return res.status(400).json({ message: "Not a valid orders ID" });
    }

    orders[orderId] = {
        ...orders[orderId],
        updatedData
    };

    res.status(200).json({ data: orders[orderId] });
});

app.delete("/orders/:orderId", (req, res) => {
    const orderId = req.params.orderId;

    if (!validate(orderId) || !orders[orderId]) {
        return res.status(400).json({ message: "Not a valid orders ID" });
    }

    delete orders[orderId];
    res.status(204).send();
});
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
