import path from "path";
import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
import packageJSON from "../package.json";
import fastifySwagger from "@fastify/swagger";
import { routes } from "./presentation/routes";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { models } from "./infrastructure/utils/models";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorHandler } from "./infrastructure/errors/error-handler";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(require("@fastify/static"), {
  root: path.join(__dirname, "../public"),
  prefix: "/public/",
});

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  swagger: {
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "l0GU.IM api",
      version: packageJSON.version,
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/swagger",
  theme: {
    title: "l0GU.IM api",
    css: [
      {
        filename: "theme.css",
        content:
          "body { padding-bottom: 80px } .topbar { position: sticky } .topbar { top: 0 } .topbar { z-index: 1 } .topbar { width: 100% }",
      },
    ],
  },
});

app.register(models);

app.register(routes, { prefix: "/api" });

app.setErrorHandler(errorHandler);

export { app };
