import { customers, products, orders } from "../data.js";

import { v4 as uuid, validate as uuidValidate } from "uuid";

const customers = {};
const products = {};
const orders = {};

const API_KEY = "jkdfbgjh765478326578%%%***@@@@bsdhfbdhhvbdsfjh@##%%";

class CustomerController {
    getAllCustomers = (req, res) => {
        const { headers } = req;
        if (headers.authorization) {
            const apiKeyParts = headers.authorization.split(" ");

            if (apiKeyParts[0] !== "Bearer" || apiKeyParts[1] !== API_KEY) {
                res.status(401).json({
                    message: "Not Valid API key"
                });
                return;
            }
        } else {
            res.status(400).json({
                message: "API key is missing"
            });
            return;
        }
        res.status(200).json({
            data: customers
        });
    };

    createCustomer = (req, res) => {
        const id = uuid();
        const { name, email } = req.body;
        customers[id] = { id, name, email };
        res.status(201).json(customers[id]);
    };

    getCustomerById = (req, res) => {
        const { id } = req.params;
        if (uuidValidate(id) && customers[id]) {
            res.json(customers[id]);
        } else {
            res.status(404).send("Customer not found");
        }
    };

    updatedCustomer = (req, res) => {
        const { id } = req.params;
        if (uuidValidate(id) && customers[id]) {
            const { name, email } = req.body;
            customers[id] = { ...customers[id], name, email };
            res.json(customers[id]);
        } else {
            res.status(404).send("Customer not found");
        }
    };

    deleteCustomer = (req, res) => {
        const { id } = req.params;
        if (uuidValidate(id) && customers[id]) {
            delete customers[id];
            res.status(204).send();
        } else {
            res.status(404).send("Customer not found");
        }
    };
}
//====================================/

class ProductController {
    getAllProduct = (req, res) => {
        res.json(products);
    };

    createProduct = (req, res) => {
        const id = uuid();
        const { name, price } = req.body;
        products[id] = { id, name, price };
        res.status(201).json(products[id]);
    };

    getProductById = (req, res) => {
        const { id } = req.params;
        if (uuidValidate(id) && products[id]) {
            res.json(products[id]);
        } else {
            res.status(404).send("Product not found");
        }
    };

    updatedProduct = (req, res) => {
        const { id } = req.params;
        if (uuidValidate(id) && products[id]) {
            const { name, price } = req.body;
            products[id] = { ...products[id], name, price };
            res.json(products[id]);
        } else {
            res.status(404).send("Product not found");
        }
    };

    deleteProduct = (req, res) => {
        const { id } = req.params;
        if (uuidValidate(id) && products[id]) {
            delete products[id];
            res.status(204).send();
        } else {
            res.status(404).send("Product not found");
        }
    };
}

//===================//
class OrderController {
    getAllOrder = (req, res) => {
        res.json(orders);
    };
    getOrderById = (req, res) => {
        const { id } = req.params;
        if (uuidValidate(id) && orders[id]) {
            res.json(orders[id]);
        } else {
            res.status(404).send("Order not found");
        }
    };
    createOrder = (req, res) => {
        const { customerId, productId } = req.body;
        if (
            uuidValidate(customerId) &&
            customers[customerId] &&
            productId.every((id) => uuidValidate(id) && products[id])
        ) {
            const id = uuid();
            orders[id] = {
                id,
                customerId,
                productId
            };
            res.status(201).json(orders[id]);
        } else {
            res.status(400).send(
                "Bad Request: Invalid Customer ID or Product IDs"
            );
        }
    };
    updatedOrder = (req, res) => {
        const { id } = req.params;
        if (uuidValidate(id) && orders[id]) {
            const { customerId, productIds } = req.body;
            if (
                uuidValidate(customerId) &&
                customers[customerId] &&
                productIds.every((id) => uuidValidate(id) && products[id])
            ) {
                orders[id] = { ...orders[id], customerId, productIds };
                res.json(orders[id]);
            } else {
                res.status(400).send(
                    "Bad Request: Invalid Customer ID or Product IDs"
                );
            }
        } else {
            res.status(404).send("Order not found");
        }
    };

    deleteOrder = (req, res) => {
        const { id } = req.params;
        if (uuidValidate(id) && orders[id]) {
            delete orders[id];
            res.status(204).send();
        } else {
            res.status(404).send("Order not found");
        }
    };
}

export const customerController = new CustomerController();
export const productController = new ProductController();
export const orderController = new OrderController();
