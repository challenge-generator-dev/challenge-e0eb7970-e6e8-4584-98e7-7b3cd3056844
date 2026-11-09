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