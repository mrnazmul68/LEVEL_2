import type { IncomingMessage, ServerResponse } from "node:http";
import { createProduct, productService } from "../service/product.service";
import { sendResponse } from "../utils/sendResponse";
import type { IProduct } from "../types/product";
import { parseBody } from "../utils/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlParams = url?.split("/");
  // /products/2
  //["", "products", "2"]
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  //GET all products
  if (url === "/products" && method === "GET") {
    try {
      const products = productService();
      sendResponse(res, true, 200, "Product featched successfully", products);
    } catch (error) {
      sendResponse(res, false, 500, "Internal server error");
    }
  } else if (method === "GET" && id !== null) {
    try {
      const products = productService();
      const product = products.find((p: IProduct) => p.id === id);
      if (!product) {
        sendResponse(res, true, 400, "Product not found");
      }
      sendResponse(res, true, 200, "Product featched successfully", product);
    } catch (error) {
      sendResponse(res, false, 500, "Internal server error");
    }
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    const product = productService();
    product.push(newProduct);
    createProduct(product);
    sendResponse(res, true, 201, "Product created successfully", product);
  } else if (method === "PUT" && id !== null) {
    const products = productService();
    const index = products.findIndex((p) => p.id === id);
    const body = await parseBody(req); //{data}

    if (index < 0) {
      return sendResponse(res, false, 400, "Product not found");
    }

    products[index] = {
      id: products[index]?.id,
      ...body,
    };

    createProduct(products);

    sendResponse(
      res,
      true,
      200,
      "Product updated successfully",
      products[index],
    );
  } else if (method === "DELETE" && id !== null) {
    const products = productService();
    const index = products.findIndex((p) => p.id === id);

    if (index < 0) {
      return sendResponse(res, false, 400, "Product not found");
    }

    products.splice(index, 1);
    createProduct(products);

    sendResponse(res, true, 200, "Product deleted successfully");
  }
};
