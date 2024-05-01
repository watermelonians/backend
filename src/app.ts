require("dotenv").config();
import express, { Response, Request, NextFunction } from "express";
import config from "config";
import validateEnv from "./utils/validateEnv";
import { AppDataSource } from "./utils/data-source";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import AppError from "./utils/appError";
import tempRouter from "./routes/user.routes";
import problemRouter from "./routes/problem.routes";
import testRouter from "./routes/test.routes";

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv();

    const app = express();

    // MIDDLEWARE

    // 1. Body parser
    app.use(express.json({ limit: "100kb" }));

    // 2. Logger
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

    // 3. Cookie Parser
    app.use(cookieParser());

    // 4. Cors
    app.use(
      cors({
        // origin: config.get<string>("nextPublicURL"),
        //origin: "https://react-frontend-slim-together.vercel.app",
        origin: "*",
        credentials: true,
      })
    );

    // ROUTES
    app.use("/api", tempRouter);
    app.use("/api/problem", problemRouter);
    app.use("/api/test", testRouter);

    // HEALTH CHECKER
    app.get("/api/healthchecker", async (_, res: Response) => {
      res.status(200).json({
        status: "success",
        message: "Welcome to WATERMELONIANS's API",
      });
    });

    // UNHANDLED ROUTE
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`));
    });

    // GLOBAL ERROR HANDLER
    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || "error";
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      }
    );

    const port = config.get<number>("port");
    app.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));
