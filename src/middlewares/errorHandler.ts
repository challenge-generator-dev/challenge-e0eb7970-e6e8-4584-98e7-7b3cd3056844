import { Request, Response, NextFunction, RequestHandler } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { ValidationException } from '../exceptions/ValidationException';
import { DuplicateProductException } from '../exceptions/DuplicateProductException';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: string[];
  timestamp: string;
  path?: string;
}

export const errorHandler: RequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[ERROR] ${err.message}`);
  console.error(`[STACK] ${err.stack}`);

  let errorResponse: ErrorResponse;
  let statusCode: number = 500;

  if (err instanceof HttpException) {
    statusCode = err.statusCode;
    errorResponse = {
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      timestamp: new Date().toISOString(),
      path: req.path
    };
  } else if (err instanceof ValidationException) {
    statusCode = 400;
    errorResponse = {
      statusCode: 400,
      message: err.message,
      errors: err.errors,
      timestamp: new Date().toISOString(),
      path: req.path
    };
  } else if (err instanceof DuplicateProductException) {
    statusCode = 409;
    errorResponse = {
      statusCode: 409,
      message: err.message,
      errors: err.errors,
      timestamp: new Date().toISOString(),
      path: req.path
    };
  } else if (err instanceof SyntaxError && 'body' in err) {
    statusCode = 400;
    errorResponse = {
      statusCode: 400,
      message: 'Solicitud malformada',
      errors: ['El cuerpo de la solicitud no es válido'],
      timestamp: new Date().toISOString(),
      path: req.path
    };
  } else if (err instanceof TypeError) {
    statusCode = 500;
    errorResponse = {
      statusCode: 500,
      message: 'Error interno del servidor',
      errors: ['Se produjo un error al procesar la solicitud'],
      timestamp: new Date().toISOString(),
      path: req.path
    };
  } else {
    errorResponse = {
      statusCode: 500,
      message: 'Error interno del servidor',
      errors: [err.message || 'Error desconocido'],
      timestamp: new Date().toISOString(),
      path: req.path
    };
  }

  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler: RequestHandler = (
  req: Request,
  res: Response
): void => {
  const errorResponse: ErrorResponse = {
    statusCode: 404,
    message: `Ruta no encontrada: ${req.method} ${req.path}`,
    timestamp: new Date().toISOString(),
    path: req.path
  };
  
  res.status(404).json(errorResponse);
};