import { customers, products, orders } from "../data.js";
import { validate, v4 as uuid } from "uuid";

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

    // getAllCustomers = (res, req) => {
    // const { headers } = req;
    // if (headers.authorization) {
    //     const apiKeyParts = headers.authorization.split(" ");
    //     if (apiKeyParts[0] !== "Bearer" || apiKeyParts[1] !== API_KEY) {
    //         res.status(401).json({
    //             message: "Not Valid API key"
    //         });
    //         return;
    //     }
    // } else {
    //     res.status(400).json({
    //         message: "API key is missing"
    //     });
    //     return;
    // }
    //     res.status(200).json({
    //         data: customers
    //     });
    // };

    createCustomer = (req, res) => {
        const data = req.body;
        const id = uuid();
        const customer = {
            id,
            ...data
        };
        customers[id] = customer;
        res.status(201).json({ data: customer });
    };

    getCustomerById = (req, res) => {
        const customerId = req.params.customerId;

        if (!validate(customerId) || !customers[customerId]) {
            return res
                .status(400)
                .json({ message: "Not a valid customers ID" });
        }
        res.status(200).json({ data: customers[customerId] });
    };

    updatedCustomer = (req, res) => {
        const customerId = req.params.customerId;
        const updatedData = req.body;
        if (!validate(customerId) || !customers[customerId]) {
            return res
                .status(400)
                .json({ message: "Not a valid customers ID" });
        }
        customers[customerId] = { ...customers[customerId], ...updatedData };
        res.status(200).json({ data: customers[customerId] });
    };

    deleteCustomer = (req, res) => {
        const customerId = req.params.customerId;
        if (!validate(customerId) || !customers[customerId]) {
            return res.status(400).json({ message: "Not a valid customer ID" });
        }
        delete customers[customerId];
        res.status(204).send();
    };
}
//====================================/

class ProductController {
    getAllProduct = (req, res) => {
        res.status(200).json({ data: products });
    };

    createProduct = (req, res) => {
        const data = req.body;
        const id = uuid();
        const product = {
            id,
            ...data
        };
        products[id] = product;
        res.status(201).json({ data: product });
    };

    getProductById = (req, res) => {
        const productId = req.params.productId;
        if (!validate(productId) || !products[productId]) {
            return res.status(400).json({ message: "Not a valid products ID" });
        }
        res.status(200).json({ data: products[productId] });
    };

    updatedProduct = (req, res) => {
        const productId = req.params.productId;
        const updatedData = req.body;
        if (!validate(productId) || !products[productId]) {
            return res.status(400).json({ message: "Not a valid products ID" });
        }
        products[productId] = { ...products[productId], ...updatedData };
        res.status(200).json({ data: products[productId] });
    };

    deleteProduct = (req, res) => {
        const productId = req.params.productId;

        if (!validate(productId) || !products[productId]) {
            return res.status(400).json({ message: "Not a valid products ID" });
        }

        delete products[productId];
        res.status(204).send();
    };
}

//===================//
class OrderController {
    getAllOrder = (req, res) => {
        res.status(200).json({ data: orders });
    };

    createOrder = (req, res) => {
        const { customerId, productId } = req.body;
        if (
            !validate(customerId) ||
            !customers[customerId] ||
            !Array.isArray(productId) ||
            productId.some(
                (productId) => !validate(productId) || !products[productId]
            )
        ) {
            return res
                .status(400)
                .json({ message: "Invalid customerId or productIds" });
        }
        const id = uuid();
        const order = {
            id,
            customerId,
            productId
        };
        orders[id] = order;
        res.status(201).json({ data: order });
    };

    updatedOrder = (req, res) => {
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
    };

    getOrderById = (req, res) => {
        const orderId = req.params.orderId;
        if (!validate(orderId) || !orders[orderId]) {
            return res.status(400).json({ message: "Not a valid orders ID" });
        }
        res.status(200).json({ data: orders[orderId] });
    };
    deleteOrder = (req, res) => {
        const orderId = req.params.orderId;

        if (!validate(orderId) || !orders[orderId]) {
            return res.status(400).json({ message: "Not a valid orders ID" });
        }

        delete orders[orderId];
        res.status(204).send();
    };
}

export const customerController = new CustomerController();
export const productController = new ProductController();
export const orderController = new OrderController();
