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