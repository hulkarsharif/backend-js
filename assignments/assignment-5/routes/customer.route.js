import {
    customerController,
    productController,
    orderController
} from "../controller/customer.controller.js";

const customerRouter = Router();
const productRouter = Router();
const orderRouter = Router();

customerRouter.get("/", customerController.getAllCustomers);
customerRouter.get("/:id", customerController.getCustomerById);
customerRouter.post("/", customerController.createCustomer);
customerRouter.put("/:id", customerController.updatedCustomer);
customerRouter.delete("/:id", customerController.deleteCustomer);

//=====================//

productRouter.get("/", productController.getAllProduct);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updatedProduct);
productRouter.delete("/:id", productController.deleteProduct);

//--------------------------//

orderRouter.get("/", orderController.getAllOrder);
orderRouter.get("/:id", orderController.getOrderById);
orderRouter.post("/", orderController.createOrder);
orderRouter.put("/:id", orderController.updatedOrder);
orderRouter.delete("/:id", orderController.deleteOrder);

export { customerRouter };
export { productRouter };
export { orderRouter };
