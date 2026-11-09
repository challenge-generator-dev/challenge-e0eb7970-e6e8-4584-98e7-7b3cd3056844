import { body, param, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ValidationException } from '../exceptions/ValidationException';

export const createProductValidationRules: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  
  body('price')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .isFloat({ min: 0, max: 1000000 })
    .withMessage('El precio debe ser un número entre 0 y 1,000,000'),
  
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero no negativo'),
  
  body('category')
    .optional()
    .isIn(['Electrónica', 'Computación', 'Accesorios', 'Gaming', 'Redes', 'Almacenamiento'])
    .withMessage('La categoría debe ser una de las permitidas'),
  
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder 500 caracteres')
];

export const updateProductValidationRules: ValidationChain[] = [
  param('id')
    .notEmpty()
    .withMessage('El ID del producto es obligatorio')
    .isString()
    .withMessage('El ID debe ser una cadena de texto'),
  
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre del producto no puede estar vacío')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  
  body('price')
    .optional()
    .notEmpty()
    .withMessage('El precio no puede estar vacío')
    .isFloat({ min: 0, max: 1000000 })
    .withMessage('El precio debe ser un número entre 0 y 1,000,000'),
  
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero no negativo'),
  
  body('category')
    .optional()
    .isIn(['Electrónica', 'Computación', 'Accesorios', 'Gaming', 'Redes', 'Almacenamiento'])
    .withMessage('La categoría debe ser una de las permitidas'),
  
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder 500 caracteres')
];

export const productIdValidationRules: ValidationChain[] = [
  param('id')
    .notEmpty()
    .withMessage('El ID del producto es obligatorio')
    .isString()
    .withMessage('El ID debe ser una cadena de texto')
];

export const validate: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => {
      if ('path' in err && 'msg' in err) {
        return `${err.path}: ${err.msg}`;
      }
      return err.msg || 'Error de validación';
    });
    
    throw new ValidationException('Error de validación en la solicitud', errorMessages);
  }
  
  next();
};

export const validateProductCreation: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const rules = createProductValidationRules;
  
  const runValidation = async (): Promise<void> => {
    await Promise.all(rules.map(rule => rule.run(req)));
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => {
        if ('path' in err && 'msg' in err) {
          return `${err.path}: ${err.msg}`;
        }
        return err.msg || 'Error de validación';
      });
      
      throw new ValidationException('Error de validación en la solicitud', errorMessages);
    }
    
    next();
  };
  
  runValidation().catch(next);
};

export const validateProductUpdate: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const rules = [...updateProductValidationRules];
  
  const runValidation = async (): Promise<void> => {
    await Promise.all(rules.map(rule => rule.run(req)));
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => {
        if ('path' in err && 'msg' in err) {
          return `${err.path}: ${err.msg}`;
        }
        return err.msg || 'Error de validación';
      });
      
      throw new ValidationException('Error de validación en la solicitud', errorMessages);
    }
    
    next();
  };
  
  runValidation().catch(next);
};