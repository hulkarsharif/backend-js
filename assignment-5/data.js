import { v4 as uuid } from "uuid";
export const customers = {
    randomUUID1: {
        id: "randomUUID1",
        name: "Alice",
        email: "alice@email.com"
    }
};

export const products = {
    randomUUID2: {
        id: "randomUUID2",
        name: "Laptop",
        price: 1000
    }
};

export const orders = {
    randomUUID3: {
        id: "randomUUID3",
        customerId: "randomUUID1",
        productIds: ["randomUUID2"]
    }
};
