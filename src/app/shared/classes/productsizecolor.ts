export class productSizeColor {
    productSizeColorId?: number;
    quantity?: number;
    productname?: string;
    productImg?: string[];
    productId?: number;
    salePrice?: number;
    constructor(
        productSizeColorId?: number,
        quantity?: number,
        productname?: string,
        productImg?: string[],
        productId?: number,
        salePrice?: number,

    ) {
        this.productSizeColorId = productSizeColorId;
        this.quantity = quantity;
        this.productname = productname;
        this.productImg = this.productImg;
        this.productId = this.productId;
        this.salePrice = this.salePrice;
    }

}



