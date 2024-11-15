import { ZodError } from "zod";
import { FastifyInstance } from "fastify";
import { UnauthorizedError } from "./error-instances/unauthorized";
import { BadRequestError, NotFoundError } from "./error-instances/bad-requests";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "One or more fields are missing or invalid.",
      errors: error.flatten().fieldErrors,
    });
  }
  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    });
  }
  if (error instanceof NotFoundError) {
    return reply.status(404).send({
      message: error.message,
    });
  }
  return reply.status(500).send({
    message: "Internal Server Error.",
    err: error
  });
};
