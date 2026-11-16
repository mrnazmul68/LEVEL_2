import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { IProduct } from "../types/product";

const filePath = path.join(process.cwd(), "./src/database/db.json");
//Product get
export const productService = ():IProduct[] => {
  const result = readFileSync(filePath, "utf-8");
  return JSON.parse(result);
};

export const createProduct = (payload: IProduct[]) => {
  return writeFileSync(filePath, JSON.stringify(payload));
};
