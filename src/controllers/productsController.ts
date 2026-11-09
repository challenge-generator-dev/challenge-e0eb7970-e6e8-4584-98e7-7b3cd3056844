import { Request, Response } from 'express';
import { ProductsService } from '../services/productsService';
import { ProductCreateDto } from '../models/product';
import { ProductUpdateDto } from '../models/product';
import { ProductResponseDto } from '../models/product';
import { HttpException } from '../exceptions/HttpException';
import { ValidationException } from '../exceptions/ValidationException';

export class ProductsController {
  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  public async listProducts(_req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productsService.getAllProducts();
      const response: ProductResponseDto[] = products.map(p => ProductResponseDto.fromProduct(p));
      
      res.status(200).json({
        success: true,
        data: response,
        count: response.length
      });
    } catch (error) {
      console.error('Error en listProducts:', error);
      throw new HttpException('Error al obtener los productos', 500);
    }
  }

  public async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id || id.trim() === '') {
        throw new ValidationException('El ID del producto es requerido');
      }

      const product = await this.productsService.getProductById(id);

      if (!product) {
        throw new HttpException('Producto no encontrado', 404);
      }

      const response = ProductResponseDto.fromProduct(product);
      
      res.status(200).json({
        success: true,
        data: response
      });
    } catch (error) {
      console.error('Error en getProductById:', error);
      if (error instanceof HttpException || error instanceof ValidationException) {
        throw error;
      }
      throw new HttpException('Error al obtener el producto', 500);
    }
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData: ProductCreateDto = req.body;

      if (!productData.name || productData.name.trim() === '') {
        throw new ValidationException('El nombre del producto es requerido');
      }

      if (productData.price === undefined || productData.price === null) {
        throw new ValidationException('El precio del producto es requerido');
      }

      if (typeof productData.price !== 'number' || productData.price < 0) {
        throw new ValidationException('El precio no puede ser negativo');
      }

      if (productData.stock !== undefined && productData.stock < 0) {
        throw new ValidationException('El stock no puede ser negativo');
      }

      const existingProduct = await this.productsService.getProductByName(productData.name);
      if (existingProduct) {
        throw new ValidationException(`Ya existe un producto con el nombre: ${productData.name}`);
      }

      const newProduct = await this.productsService.createProduct(productData);
      const response = ProductResponseDto.fromProduct(newProduct);

      res.status(201).json({
        success: true,
        data: response,
        message: 'Producto creado exitosamente'
      });
    } catch (error) {
      console.error('Error en createProduct:', error);
      if (error instanceof HttpException || error instanceof ValidationException) {
        throw error;
      }
      throw new HttpException('Error al crear el producto', 500);
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: ProductUpdateDto = req.body;

      if (!id || id.trim() === '') {
        throw new ValidationException('El ID del producto es requerido');
      }

      const existingProduct = await this.productsService.getProductById(id);
      if (!existingProduct) {
        throw new HttpException('Producto no encontrado', 404);
      }

      if (updateData.price !== undefined && updateData.price !== null) {
        if (typeof updateData.price !== 'number' || updateData.price < 0) {
          throw new ValidationException('El precio no puede ser negativo');
        }
      }

      if (updateData.stock !== undefined && updateData.stock < 0) {
        throw new ValidationException('El stock no puede ser negativo');
      }

      if (updateData.name && updateData.name.trim() !== '') {
        const productWithName = await this.productsService.getProductByName(updateData.name);
        if (productWithName && productWithName.id !== id) {
          throw new ValidationException(`Ya existe otro producto con el nombre: ${updateData.name}`);
        }
      }

      const updatedProduct = await this.productsService.updateProduct(id, updateData);
      const response = ProductResponseDto.fromProduct(updatedProduct);

      res.status(200).json({
        success: true,
        data: response,
        message: 'Producto actualizado exitosamente'
      });
    } catch (error) {
      console.error('Error en updateProduct:', error);
      if (error instanceof HttpException || error instanceof ValidationException) {
        throw error;
      }
      throw new HttpException('Error al actualizar el producto', 500);
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id || id.trim() === '') {
        throw new ValidationException('El ID del producto es requerido');
      }

      const existingProduct = await this.productsService.getProductById(id);
      if (!existingProduct) {
        throw new HttpException('Producto no encontrado', 404);
      }

      await this.productsService.deleteProduct(id);

      res.status(200).json({
        success: true,
        message: 'Producto eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error en deleteProduct:', error);
      if (error instanceof HttpException || error instanceof ValidationException) {
        throw error;
      }
      throw new HttpException('Error al eliminar el producto', 500);
    }
  }
}