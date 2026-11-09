import { Product, ProductCreateDto, ProductUpdateDto, ProductResponseDto } from '../models/product';
import { DuplicateProductException } from '../exceptions/DuplicateProductException';
import { ValidationException } from '../exceptions/ValidationException';
import { getMockProducts, addMockProduct, updateMockProduct, deleteMockProduct, mockProductExistsByName } from '../utils/mockData';

export class ProductsService {
  private products: Product[] = [];

  constructor() {
    this.products = getMockProducts();
  }

  private findProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  private findProductByName(name: string, excludeId?: string): Product | undefined {
    return this.products.find(p => 
      p.name.toLowerCase() === name.toLowerCase() && p.id !== excludeId
    );
  }

  private validateProductData(dto: ProductCreateDto | ProductUpdateDto, isUpdate: boolean = false): void {
    const errors: string[] = [];

    if (!isUpdate || dto.name !== undefined) {
      if (!dto.name || dto.name.trim().length === 0) {
        errors.push('El nombre del producto es obligatorio');
      } else if (dto.name.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres');
      } else if (dto.name.length > 100) {
        errors.push('El nombre no puede exceder 100 caracteres');
      }
    }

    if (!isUpdate || dto.price !== undefined) {
      if (dto.price === undefined || dto.price === null) {
        errors.push('El precio es obligatorio');
      } else if (typeof dto.price !== 'number') {
        errors.push('El precio debe ser un número');
      } else if (dto.price < 0) {
        errors.push('El precio no puede ser negativo');
      } else if (dto.price > 1000000) {
        errors.push('El precio excede el límite permitido');
      }
    }

    if (!isUpdate || dto.stock !== undefined) {
      if (dto.stock !== undefined && (typeof dto.stock !== 'number' || dto.stock < 0)) {
        errors.push('El stock debe ser un número no negativo');
      }
    }

    if (!isUpdate || dto.category !== undefined) {
      const validCategories = ['Electrónica', 'Computación', 'Accesorios', 'Gaming', 'Redes', 'Almacenamiento'];
      if (dto.category && !validCategories.includes(dto.category)) {
        errors.push(`La categoría debe ser una de: ${validCategories.join(', ')}`);
      }
    }

    if (errors.length > 0) {
      throw new ValidationException('Error de validación en los datos del producto', errors);
    }
  }

  public listProducts(): ProductResponseDto[] {
    this.products = getMockProducts();
    return this.products.map(p => ProductResponseDto.fromProduct(p));
  }

  public getProductById(id: string): ProductResponseDto {
    const product = this.findProductById(id);
    
    if (!product) {
      throw new ValidationException(`Producto con ID ${id} no encontrado`, ['Producto no encontrado']);
    }
    
    return ProductResponseDto.fromProduct(product);
  }

  public createProduct(dto: ProductCreateDto): ProductResponseDto {
    this.validateProductData(dto, false);

    const existingProduct = this.findProductByName(dto.name);
    if (existingProduct) {
      throw new DuplicateProductException(
        `Ya existe un producto con el nombre "${dto.name}"`,
        ['El nombre del producto ya está en uso']
      );
    }

    const now = new Date().toISOString();
    const newProduct: Product = {
      id: this.generateId(),
      name: dto.name.trim(),
      price: dto.price,
      stock: dto.stock || 0,
      category: dto.category || 'Electrónica',
      description: dto.description || '',
      createdAt: now,
      updatedAt: now
    };

    const addedProduct = addMockProduct({
      name: newProduct.name,
      price: newProduct.price,
      stock: newProduct.stock,
      category: newProduct.category,
      description: newProduct.description,
      sku: `SKU-${Date.now()}`
    });
    
    this.products = getMockProducts();
    
    return ProductResponseDto.fromProduct(addedProduct as Product);
  }

  public updateProduct(id: string, dto: ProductUpdateDto): ProductResponseDto {
    const product = this.findProductById(id);
    
    if (!product) {
      throw new ValidationException(`Producto con ID ${id} no encontrado`, ['Producto no encontrado']);
    }

    this.validateProductData(dto, true);

    if (dto.name !== undefined) {
      const existingWithName = this.findProductByName(dto.name, id);
      if (existingWithName) {
        throw new DuplicateProductException(
          `Ya existe otro producto con el nombre "${dto.name}"`,
          ['El nombre del producto ya está en uso']
        );
      }
    }

    const updates: Partial<Product> = {
      name: dto.name !== undefined ? dto.name.trim() : product.name,
      price: dto.price !== undefined ? dto.price : product.price,
      stock: dto.stock !== undefined ? dto.stock : product.stock,
      category: dto.category !== undefined ? dto.category : product.category,
      description: dto.description !== undefined ? dto.description : product.description,
      updatedAt: new Date().toISOString()
    };

    const updatedProduct = updateMockProduct(id, updates);
    
    if (!updatedProduct) {
      throw new ValidationException(`Producto con ID ${id} no encontrado`, ['Producto no encontrado']);
    }
    
    this.products = getMockProducts();
    
    return ProductResponseDto.fromProduct(updatedProduct as Product);
  }

  public deleteProduct(id: string): void {
    const product = this.findProductById(id);
    
    if (!product) {
      throw new ValidationException(`Producto con ID ${id} no encontrado`, ['Producto no encontrado']);
    }

    const deleted = deleteMockProduct(id);
    
    if (!deleted) {
      throw new ValidationException(`Producto con ID ${id} no encontrado`, ['Producto no encontrado']);
    }
    
    this.products = getMockProducts();
  }

  private generateId(): string {
    return 'prod_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
}