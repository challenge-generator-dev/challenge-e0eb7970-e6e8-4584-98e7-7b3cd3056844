import { ProductCategory, ProductCategoryType } from '../types/productTypes';

export interface MockProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: ProductCategoryType;
  description?: string;
  sku?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const baseDate = new Date('2024-01-15T10:00:00Z');

const initialMockProducts: MockProduct[] = [
  {
    id: generateId(),
    name: 'Laptop Gaming Pro 15"',
    price: 1299.99,
    stock: 25,
    category: ProductCategory.COMPUTING,
    description: 'Laptop gaming con procesador Intel Core i7, 16GB RAM, GPU RTX 4060',
    sku: 'LAP-PRO-001',
    createdAt: baseDate,
    updatedAt: baseDate
  },
  {
    id: generateId(),
    name: 'Mouse Inalámbrico Ergonómico',
    price: 49.99,
    stock: 150,
    category: ProductCategory.PERIPHERALS,
    description: 'Mouse wireless con sensor óptico de alta precisión y batería de larga duración',
    sku: 'MOU-ERG-002',
    createdAt: baseDate,
    updatedAt: baseDate
  },
  {
    id: generateId(),
    name: 'Teclado Mecánico RGB',
    price: 89.99,
    stock: 80,
    category: ProductCategory.PERIPHERALS,
    description: 'Teclado mecánico con switches Cherry MX, retroiluminación RGB personalizable',
    sku: 'TEC-MEC-003',
    createdAt: baseDate,
    updatedAt: baseDate
  },
  {
    id: generateId(),
    name: 'Monitor 4K UltraWide 34"',
    price: 599.99,
    stock: 15,
    category: ProductCategory.ELECTRONICS,
    description: 'Monitor curvo ultrawide con resolución 3440x1440, 144Hz refresh rate',
    sku: 'MON-4K-004',
    createdAt: baseDate,
    updatedAt: baseDate
  },
  {
    id: generateId(),
    name: 'Router WiFi 6 Mesh',
    price: 179.99,
    stock: 60,
    category: ProductCategory.NETWORKING,
    description: 'Sistema mesh WiFi 6 con cobertura hasta 500m2, soporta hasta 100 dispositivos',
    sku: 'ROU-W6-005',
    createdAt: baseDate,
    updatedAt: baseDate
  },
  {
    id: generateId(),
    name: 'Disco SSD NVMe 2TB',
    price: 159.99,
    stock: 200,
    category: ProductCategory.STORAGE,
    description: 'SSD NVMe PCIe 4.0 con velocidades de lectura hasta 7000MB/s',
    sku: 'SSD-NV-006',
    createdAt: baseDate,
    updatedAt: baseDate
  },
  {
    id: generateId(),
    name: 'Webcam 4K con Micrófono',
    price: 129.99,
    stock: 45,
    category: ProductCategory.ACCESSORIES,
    description: 'Webcam Ultra HD 4K con autofocus y micrófono estéreo integradas',
    sku: 'WEB-4K-007',
    createdAt: baseDate,
    updatedAt: baseDate
  },
  {
    id: generateId(),
    name: 'Auriculares Bluetooth ANC',
    price: 199.99,
    stock: 70,
    category: ProductCategory.ACCESSORIES,
    description: 'Auriculares inalámbricos con cancelación activa de ruido, 30h autonomía',
    sku: 'AUD-ANC-008',
    createdAt: baseDate,
    updatedAt: baseDate
  },
  {
    id: generateId(),
    name: 'Placa Base Gaming Z790',
    price: 349.99,
    stock: 20,
    category: ProductCategory.COMPUTING,
    description: 'Placa base para Intel de 12ª/13ª generación con DDR5 y PCIe 5.0',
    sku: 'MB-Z790-009',
    createdAt: baseDate,
    updatedAt: baseDate
  },
  {
    id: generateId(),
    name: 'Switch Gigabit 8 Puertos',
    price: 59.99,
    stock: 120,
    category: ProductCategory.NETWORKING,
    description: 'Switch gestionable Gigabit con QoS y VLANs, ideal para pequeña oficina',
    sku: 'SWT-GIG-010',
    createdAt: baseDate,
    updatedAt: baseDate
  },
  {
    id: generateId(),
    name: 'Cámara de Seguridad IP',
    price: 79.99,
    stock: 90,
    category: ProductCategory.ELECTRONICS,
    description: 'Cámara IP WiFi con visión nocturna, detección de movimiento y audio bidireccional',
    sku: 'CAM-IP-011',
    createdAt: baseDate,
    updatedAt: baseDate
  },
  {
    id: generateId(),
    name: 'Hub USB-C 7 en 1',
    price: 39.99,
    stock: 180,
    category: ProductCategory.ACCESSORIES,
    description: 'Hub multiport con HDMI 4K, USB 3.0, SD/microSD y USB-C PD 100W',
    sku: 'HUB-USC-012',
    createdAt: baseDate,
    updatedAt: baseDate
  }
];

export const mockProducts: MockProduct[] = [...initialMockProducts];

export function getMockProducts(): MockProduct[] {
  return [...mockProducts];
}

export function getMockProductById(id: string): MockProduct | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getMockProductByName(name: string): MockProduct | undefined {
  return mockProducts.find(p => p.name.toLowerCase() === name.toLowerCase());
}

export function getMockProductsByCategory(category: ProductCategoryType): MockProduct[] {
  return mockProducts.filter(p => p.category === category);
}

export function getMockProductsInStock(): MockProduct[] {
  return mockProducts.filter(p => p.stock > 0);
}

export function searchMockProducts(term: string): MockProduct[] {
  const lowerTerm = term.toLowerCase();
  return mockProducts.filter(p => 
    p.name.toLowerCase().includes(lowerTerm) ||
    p.description?.toLowerCase().includes(lowerTerm) ||
    p.sku?.toLowerCase().includes(lowerTerm)
  );
}

export function addMockProduct(product: Omit<MockProduct, 'id' | 'createdAt' | 'updatedAt'>): MockProduct {
  const newProduct: MockProduct = {
    ...product,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  mockProducts.push(newProduct);
  return newProduct;
}

export function updateMockProduct(id: string, updates: Partial<MockProduct>): MockProduct | null {
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  mockProducts[index] = {
    ...mockProducts[index],
    ...updates,
    updatedAt: new Date()
  };
  return mockProducts[index];
}

export function deleteMockProduct(id: string): boolean {
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  mockProducts.splice(index, 1);
  return true;
}

export function mockProductExistsByName(name: string, excludeId?: string): boolean {
  return mockProducts.some(p => 
    p.name.toLowerCase() === name.toLowerCase() && p.id !== excludeId
  );
}

export function resetMockData(): void {
  mockProducts.length = 0;
  mockProducts.push(...initialMockProducts);
}

export function setMockProducts(products: MockProduct[]): void {
  mockProducts.length = 0;
  mockProducts.push(...products);
}

export const MOCK_PRODUCT_STATS = {
  totalProducts: mockProducts.length,
  totalStock: mockProducts.reduce((sum, p) => sum + p.stock, 0),
  averagePrice: mockProducts.reduce((sum, p) => sum + p.price, 0) / mockProducts.length,
  categories: Object.values(ProductCategory).map(cat => ({
    category: cat,
    count: mockProducts.filter(p => p.category === cat).length
  }))
};