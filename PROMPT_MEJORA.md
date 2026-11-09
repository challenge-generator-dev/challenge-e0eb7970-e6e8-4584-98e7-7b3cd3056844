# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/controllers/productsController.ts` — `ProductsService.getAllProducts`: Se invoca `getAllProducts` sobre `ProductsService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/controllers/productsController.ts` — `ProductsService.getProductByName`: Se invoca `getProductByName` sobre `ProductsService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/services/productsService.ts` — `Product.find`: Se invoca `find` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/services/productsService.ts` — `Product.map`: Se invoca `map` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/exceptions/ValidationException.ts` — `ValidationError.find`: Se invoca `find` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/exceptions/ValidationException.ts` — `ValidationError.some`: Se invoca `some` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/utils/mockData.ts` — `MockProduct.findIndex`: Se invoca `findIndex` sobre `MockProduct`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/utils/mockData.ts` — `MockProduct.reduce`: Se invoca `reduce` sobre `MockProduct`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
Construir endpoints REST con validacion y manejo de errores (corrida e2e 20261109184921254), Expone endpoints REST con validacion de entrada y manejo centralizado de errores

### Misión / candidato
Exponer el catalogo de productos

### Reto
- Tema: Construccion de APIs REST con Express
- Seniority: advanced-l2
- Tipo: practical
- Título: Desarrollo de API REST para catálogo de productos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición y configuración inicial — objetivo: Configurar el entorno y definir la estructura básica de la API. — entregable (NO resolver): Proyecto configurado con un endpoint básico para listar productos.
- Fase 2: Implementación de validaciones y manejo de errores — objetivo: Agregar validaciones a los endpoints y manejar los errores de manera centralizada. — entregable (NO resolver): API con validaciones implementadas y manejo centralizado de errores.
- Fase 3: Exposición del catálogo de productos — objetivo: Exponer el catálogo de productos a través de la API. — entregable (NO resolver): API que expone el catálogo de productos con las validaciones y manejo de errores implementados.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "techmarket-api",
  "version": "1.0.0",
  "description": "API REST para catálogo de productos de TechMarket",
  "main": "src/main.ts",
  "scripts": {
    "start": "ts-node src/main.ts",
    "build": "tsc",
    "test": "jest",
    "dev": "ts-node src/main.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.20.3",
    "class-validator": "^0.14.1",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "express-validator": "^7.2.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.12",
    "jest": "^29.7.0",
    "supertest": "^6.3.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.0"
  }
}


// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "types": ["jest", "node"]
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules"]
}

// === ARCHIVO: src/main.ts ===
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productsRouter from './routes/products';
import { errorHandler } from './middlewares/errorHandler';

// Cargar variables de entorno
dotenv.config();

class Server {
    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.configureMiddlewares();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    private configureMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private configureRoutes(): void {
        this.app.use('/products', productsRouter);
    }

    private configureErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

// Verificar que las variables de entorno críticas están definidas
if (!process.env.PORT) {
    console.warn('PORT not defined in .env, using default 3000');
}

// Inicializar el servidor
const server = new Server();
server.start();

// Exportar la app para testing
export default server;

// === ARCHIVO: src/models/product.ts ===
import { IsNumber, IsString, IsNotEmpty, Min, IsOptional } from 'class-validator';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ProductCreateDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock: number;

    @IsString()
    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    category: string;
}

export class ProductUpdateDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    @IsOptional()
    price?: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    @IsOptional()
    stock?: number;

    @IsString()
    @IsOptional()
    category?: string;
}

export class ProductResponseDto {
    constructor(
        public id: string,
        public name: string,
        public description: string | null,
        public price: number,
        public stock: number,
        public category: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}

    static fromProduct(product: Product): ProductResponseDto {
        return new ProductResponseDto(
            product.id,
            product.name,
            product.description || null,
            product.price,
            product.stock,
            product.category,
            product.createdAt,
            product.updatedAt
        );
    }
}

// === ARCHIVO: src/app.ts ===
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productRoutes from './routes/products';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/products', productRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error no manejado:', err.message);
  
  if (err.name === 'ValidationException' || err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: err.message
    });
  }
  
  if (err.name === 'HttpException') {
    const statusCode = (err as any).statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      error: err.message
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

// === ARCHIVO: src/routes/products.ts ===
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

// === ARCHIVO: src/controllers/productsController.ts ===
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

// === ARCHIVO: src/services/productsService.ts ===
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

// === ARCHIVO: src/middlewares/errorHandler.ts ===
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

// === ARCHIVO: src/validators/productValidator.ts ===
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

// === ARCHIVO: src/exceptions/HttpException.ts ===
export class HttpException extends Error {
    public statusCode: number;
    public message: string;
    public error: string | null;
    public timestamp: string;
    public path: string | null;

    constructor(
        statusCode: number,
        message: string,
        error: string | null = null,
        path: string | null = null
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.timestamp = new Date().toISOString();
        this.path = path;

        Object.setPrototypeOf(this, HttpException.prototype);
    }

    public toJSON() {
        return {
            statusCode: this.statusCode,
            error: this.error,
            message: this.message,
            timestamp: this.timestamp,
            path: this.path
        };
    }

    public static fromError(error: Error, statusCode: number = 500): HttpException {
        return new HttpException(
            statusCode,
            error.message,
            error.name,
            null
        );
    }
}

// === ARCHIVO: src/exceptions/ValidationException.ts ===
import { HttpException } from './HttpException';

export interface ValidationError {
    field: string;
    message: string;
    value?: unknown;
}

export class ValidationException extends HttpException {
    public validationErrors: ValidationError[];

    constructor(
        message: string = 'Validation failed',
        validationErrors: ValidationError[] = []
    ) {
        super(400, message, 'Validation Error', null);
        this.validationErrors = validationErrors;
        Object.setPrototypeOf(this, ValidationException.prototype);
    }

    public static fromExpressValidatorErrors(errors: Array<{
        path: string;
        msg: string;
        value?: unknown;
    }>): ValidationException {
        const validationErrors: ValidationError[] = errors.map(error => ({
            field: error.path,
            message: error.msg,
            value: error.value
        }));

        return new ValidationException(
            'Validation failed for the provided data',
            validationErrors
        );
    }

    public static fromFieldErrors(fieldErrors: Record<string, string>): ValidationException {
        const validationErrors: ValidationError[] = Object.entries(fieldErrors).map(
            ([field, message]) => ({
                field,
                message
            })
        );

        return new ValidationException(
            'One or more validation errors occurred',
            validationErrors
        );
    }

    public getFirstError(): ValidationError | null {
        return this.validationErrors.length > 0 ? this.validationErrors[0] : null;
    }

    public getErrorForField(field: string): ValidationError | undefined {
        return this.validationErrors.find(error => error.field === field);
    }

    public hasField(field: string): boolean {
        return this.validationErrors.some(error => error.field === field);
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            validationErrors: this.validationErrors
        };
    }
}

// === ARCHIVO: src/exceptions/DuplicateProductException.ts ===
import { HttpException } from './HttpException';

export class DuplicateProductException extends HttpException {
    public productName: string;
    public existingProductId: string | null;

    constructor(
        productName: string,
        existingProductId: string | null = null,
        message: string = 'A product with this name already exists'
    ) {
        super(409, message, 'Conflict', null);
        this.productName = productName;
        this.existingProductId = existingProductId;
        Object.setPrototypeOf(this, DuplicateProductException.prototype);
    }

    public static withProductId(productName: string, existingProductId: string): DuplicateProductException {
        return new DuplicateProductException(
            productName,
            existingProductId,
            `Product with name '${productName}' already exists with ID: ${existingProductId}`
        );
    }

    public static withGenericMessage(productName: string): DuplicateProductException {
        return new DuplicateProductException(
            productName,
            null,
            `Cannot create product: the name '${productName}' is already in use`
        );
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            productName: this.productName,
            existingProductId: this.existingProductId
        };
    }
}

// === ARCHIVO: src/types/productTypes.ts ===
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

// === ARCHIVO: tests/products.test.ts ===
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

// === ARCHIVO: src/utils/mockData.ts ===
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
```
