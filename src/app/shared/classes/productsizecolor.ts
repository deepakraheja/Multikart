export class productSizeColor {
    productSizeColorId?: number;
    productSizeId?: number;
    quantity?: number;
    productname?: string;
    productImg?: string[];
    productId?: number;
    salePrice?: number;
    selectedQty?: number;
    isSelected?: boolean;

    constructor(
        productSizeColorId?: number,
        productSizeId?: number,
        quantity?: number,
        productname?: string,
        productImg?: string[],
        productId?: number,
        salePrice?: number,
        selectedQty?: number,
        isSelected?: boolean,

    ) {
        this.productSizeColorId = productSizeColorId;
        this.productSizeId = productSizeId;
        this.quantity = quantity;
        this.productname = productname;
        this.productImg = this.productImg;
        this.productId = this.productId;
        this.salePrice = this.salePrice;
        this.selectedQty = selectedQty;
        this.isSelected = isSelected;
    }

}



