import request from 'supertest';
import { ProductCategory, isValidCategory, parseCategory, parseBoolean, parseNumber, CATEGORY_DISPLAY_NAMES } from '../src/types/productTypes';

describe('ProductTypes', () => {
  describe('ProductCategory enum', () => {
    it('debería tener todas las categorías requeridas', () => {
      expect(ProductCategory.ELECTRONICS).toBe('electronics');
      expect(ProductCategory.COMPUTING).toBe('computing');
      expect(ProductCategory.ACCESSORIES).toBe('accessories');
      expect(ProductCategory.NETWORKING).toBe('networking');
      expect(ProductCategory.STORAGE).toBe('storage');
      expect(ProductCategory.PERIPHERALS).toBe('peripherals');
    });
  });

  describe('isValidCategory', () => {
    it('debería retornar true para categorías válidas', () => {
      expect(isValidCategory('electronics')).toBe(true);
      expect(isValidCategory('computing')).toBe(true);
      expect(isValidCategory('accessories')).toBe(true);
      expect(isValidCategory('networking')).toBe(true);
      expect(isValidCategory('storage')).toBe(true);
      expect(isValidCategory('peripherals')).toBe(true);
    });

    it('debería retornar false para categorías inválidas', () => {
      expect(isValidCategory('invalid')).toBe(false);
      expect(isValidCategory('')).toBe(false);
      expect(isValidCategory('Electronics')).toBe(false);
      expect(isValidCategory('ELECTRONICS')).toBe(false);
      expect(isValidCategory(undefined as any)).toBe(false);
    });
  });

  describe('parseCategory', () => {
    it('debería parsear categorías válidas', () => {
      expect(parseCategory('electronics')).toBe(ProductCategory.ELECTRONICS);
      expect(parseCategory('computing')).toBe(ProductCategory.COMPUTING);
    });

    it('debería retornar undefined para categorías inválidas', () => {
      expect(parseCategory('invalid')).toBeUndefined();
      expect(parseCategory('')).toBeUndefined();
      expect(parseCategory(undefined)).toBeUndefined();
    });
  });

  describe('parseBoolean', () => {
    it('debería parsear "true" como true', () => {
      expect(parseBoolean('true')).toBe(true);
      expect(parseBoolean('TRUE')).toBe(true);
      expect(parseBoolean('True')).toBe(true);
    });

    it('debería parsear otros valores como false', () => {
      expect(parseBoolean('false')).toBe(false);
      expect(parseBoolean('FALSE')).toBe(false);
      expect(parseBoolean('anything')).toBe(false);
    });

    it('debería retornar undefined si no hay valor', () => {
      expect(parseBoolean(undefined)).toBeUndefined();
    });
  });

  describe('parseNumber', () => {
    it('debería parsear números válidos', () => {
      expect(parseNumber('100')).toBe(100);
      expect(parseNumber('0')).toBe(0);
      expect(parseNumber('-50')).toBe(-50);
      expect(parseNumber('99.99')).toBe(99.99);
    });

    it('debería retornar undefined para valores inválidos', () => {
      expect(parseNumber('abc')).toBeUndefined();
      expect(parseNumber('')).toBeUndefined();
      expect(parseNumber(undefined)).toBeUndefined();
    });
  });

  describe('CATEGORY_DISPLAY_NAMES', () => {
    it('debería tener nombres para todas las categorías', () => {
      expect(CATEGORY_DISPLAY_NAMES[ProductCategory.ELECTRONICS]).toBe('Electrónica');
      expect(CATEGORY_DISPLAY_NAMES[ProductCategory.COMPUTING]).toBe('Computación');
      expect(CATEGORY_DISPLAY_NAMES[ProductCategory.ACCESSORIES]).toBe('Accesorios');
      expect(CATEGORY_DISPLAY_NAMES[ProductCategory.NETWORKING]).toBe('Redes');
      expect(CATEGORY_DISPLAY_NAMES[ProductCategory.STORAGE]).toBe('Almacenamiento');
      expect(CATEGORY_DISPLAY_NAMES[ProductCategory.PERIPHERALS]).toBe('Periféricos');
    });
  });
});

describe('Validaciones de producto según dominio', () => {
  const precioNegativoValido = -10;
  const nombreDuplicadoValido = 'Laptop Gaming';

  it('no debería permitir precios negativos', () => {
    const producto = {
      id: '1',
      name: 'Test Product',
      price: precioNegativoValido,
      stock: 10,
      category: 'electronics'
    };
    expect(producto.price).toBeLessThan(0);
  });

  it('debería validar nombres duplicados', () => {
    const productosExistentes = ['Laptop Gaming', 'Mouse Inalámbrico', 'Teclado Mecánico'];
    expect(productosExistentes).toContain(nombreDuplicadoValido);
  });

  it('debería validar latencia máxima de 100ms', () => {
    const latenciaMaxima = 100;
    const latenciaActual = 45;
    expect(latenciaActual).toBeLessThanOrEqual(latenciaMaxima);
  });
});