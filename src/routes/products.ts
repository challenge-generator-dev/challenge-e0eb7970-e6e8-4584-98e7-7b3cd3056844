import { Router, Request, Response, NextFunction } from 'express';
import { ProductsController } from '../controllers/productsController';
import { validateProductCreation, validateProductUpdate } from '../validators/productValidator';

const router: Router = Router();
const productsController = new ProductsController();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await productsController.listProducts(_req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productsController.getProductById(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateProductCreation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productsController.createProduct(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateProductUpdate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productsController.updateProduct(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productsController.deleteProduct(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;