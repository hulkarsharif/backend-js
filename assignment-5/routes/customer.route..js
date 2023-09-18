import { Router } from "express";

// import {
//     getAllCustomers,
//     createCustomer,
//     getCustomerById,
//     updatedCustomer,
//     deleteCustomer,
//     getAllProduct,
//     createProduct,
//     getProductById,
//     updatedProduct,
//     deleteProduct,
//     getAllOrder,
//     createOrder,
//     updatedOrder,
//     getOrderById,
//     deleteOrder
// } from "../controller/customer.controller.js";

import {
    customerController,
    productController,
    orderController
} from "../controller/customer.controller.js";

const customerRouter = Router();
const productRouter = Router();
const orderRouter = Router();

customerRouter.get("/", customerController.getAllCustomers);
customerRouter.get("/:customerId", customerController.getCustomerById);
customerRouter.post("/", customerController.createCustomer);
customerRouter.put("/:customerId", customerController.updatedCustomer);
customerRouter.delete("/:customerId", customerController.deleteCustomer);

//=====================//

productRouter.get("/", productController.getAllProduct);
productRouter.get("/:productId", productController.getProductById);
productRouter.post("/", productController.createProduct);
productRouter.put("/:productId", productController.updatedProduct);
productRouter.delete("/:productId", productController.deleteProduct);

//--------------------------//

orderRouter.get("/", orderController.getAllOrder);
orderRouter.get("/:orderId", orderController.getOrderById);
orderRouter.post("/", orderController.createOrder);
orderRouter.put("/:orderId", orderController.updatedOrder);
orderRouter.delete("/:orderId", orderController.deleteOrder);

export { customerRouter };
export { productRouter };
export { orderRouter };
