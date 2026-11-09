export enum ProductCategory {
  ELECTRONICS = 'electronics',
  COMPUTING = 'computing',
  ACCESSORIES = 'accessories',
  NETWORKING = 'networking',
  STORAGE = 'storage',
  PERIPHERALS = 'peripherals'
}

export type ProductCategoryType = 
  | ProductCategory.ELECTRONICS
  | ProductCategory.COMPUTING
  | ProductCategory.ACCESSORIES
  | ProductCategory.NETWORKING
  | ProductCategory.STORAGE
  | ProductCategory.PERIPHERALS;

export interface ProductFilter {
  category?: ProductCategoryType;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  searchTerm?: string;
}

export interface ProductListResponse {
  products: Array<{
    id: string;
    name: string;
    price: number;
    stock: number;
    category: ProductCategoryType;
  }>;
  total: number;
  page: number;
  limit: number;
}

export interface ProductSearchParams {
  query?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  page?: string;
  limit?: string;
}

export const CATEGORY_DISPLAY_NAMES: Record<ProductCategoryType, string> = {
  [ProductCategory.ELECTRONICS]: 'Electrónica',
  [ProductCategory.COMPUTING]: 'Computación',
  [ProductCategory.ACCESSORIES]: 'Accesorios',
  [ProductCategory.NETWORKING]: 'Redes',
  [ProductCategory.STORAGE]: 'Almacenamiento',
  [ProductCategory.PERIPHERALS]: 'Periféricos'
};

export function isValidCategory(value: string): value is ProductCategoryType {
  return Object.values(ProductCategory).includes(value as ProductCategoryType);
}

export function parseCategory(value: string | undefined): ProductCategoryType | undefined {
  if (!value) return undefined;
  return isValidCategory(value) ? value : undefined;
}

export function parseBoolean(value: string | undefined): boolean | undefined {
  if (value === undefined) return undefined;
  return value.toLowerCase() === 'true';
}

export function parseNumber(value: string | undefined): number | undefined {
  if (value === undefined) return undefined;
  const parsed = Number(value);
  return isNaN(parsed) ? undefined : parsed;
}