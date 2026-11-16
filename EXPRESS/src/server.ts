import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { config } from "./config";
import { Pool } from "pg";

const app: Application = express();

const pool = new Pool({ connectionString: config.database_connection });

const init = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(300) UNIQUE NOT NULL,
      password VARCHAR(50),
      age INT,
      isActive BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `);
    console.log("DB connected");
  } catch (error) {
    console.error(error);
  }
};

init();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is home route",
  });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
