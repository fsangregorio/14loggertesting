
import express from "express";
import cookieParser from "cookie-parser";
import productRouter from "../routes/productsRoute.js";
import sessionRouter from "../routes/sessionsRoute.js";
import roleRouter from "../routes/roleRoute.js";
import cartRouter from "../routes/cartsRoute.js";
import userRouter from "../routes/usersRoute.js";
import errorHandler from "../middleware/errorHandler.js";
import logger from "../middleware/logger.js";
import compression from "express-compression";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerOptions } from "../../config/swaggerconfig.js";
import testLoggerRouter from "../routes/testLoggerRoute.js";

class AppExpress {
  init() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(
      compression({
        brotli: {
          enable: true,
          zlib: {},
        },
      })
    );
  }

  build() {
    const swaggerDocs = swaggerJsdoc(swaggerOptions);
    this.app.use(
      "/docs",
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(swaggerDocs)
    );
    this.app.use(logger);
    this.app.use("/api/sessions", sessionRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/api/roles", roleRouter);
    this.app.use("/api/products", productRouter);
    this.app.use("/api/carts", cartRouter);
    this.app.use("/testLogger", testLoggerRouter);
    this.app.use(errorHandler);
  }

  callback() {
    return this.app;
  }

  close() {
    this.server.close();
  }
  
  listen() {
    return this.app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  }
}

export default AppExpress;
