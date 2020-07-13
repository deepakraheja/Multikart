export class Productkart {
    productID?: number;
    productName?: string;
    shortDetails?: string;
    description?: string;
    supplierId?: number;
    brandId?: number;
    qty?: number;
    price?: number;
    salePrice?: number;
    availableSize?: boolean;
    availableColors?: boolean;
    size?: string;
    color?: string;
    discount?: number;
    discountAvailable?: boolean;
    productAvailable?: boolean;
    featured?: boolean;
    latest?: boolean;
    onSale?: boolean;
    topSelling?: boolean;
    hotOffer?: boolean;
    subcatecode?: string;

    subcategoryName?: string;
    subCategoryID?: number;
    brandName?: string;
    rowID?: string;

    Type?: string;
    ImagePath?: string;
    Title?: string;
    SubTitle?: string;
    BannerImage?: string;
    frontImage?: string;

    productImg?: string[];
    productSizeColorId?: number;
    prodColor?: string[];
    prodsize?: string[];
    productSizeColor:string[];
    
    constructor(
        productID?: number,
        productName?: string,
        shortDetails?: string,
        description?: string,
        supplierId?: number,
        brandId?: number,
        qty?: number,
        price?: number,
        salePrice?: number,
        availableSize?: boolean,
        availableColors?: boolean,
        size?: string,
        color?: string,
        discount?: number,
        discountAvailable?: boolean,
        productAvailable?: boolean,
        featured?: boolean,
        latest?: boolean,
        onSale?: boolean,
        topSelling?: boolean,
        hotOffer?: boolean,
        subcatecode?: string,

        subcategoryName?: string,
        subCategoryID?: number,
        brandName?: string,
        rowID?: string,

        Type?: string,
        ImagePath?: string,
        Title?: string,
        SubTitle?: string,
        BannerImage?: string,
        frontImage?: string,
        productImg?: string[],
        productSizeColorId?: number,
        prodColor?: string[],
        prodsize?: string[],
        productSizeColor?:string[],
    ) {
        this.productID = productID;
        this.productName = productName;
        this.shortDetails = shortDetails;
        this.description = description;

        this.supplierId = supplierId;
        this.brandId = brandId;
        this.qty = qty;
        this.price = price;
        this.salePrice = salePrice;
        this.availableSize = availableSize;
        this.availableColors = availableColors;
        this.size = size;
        this.color = color;
        this.discount = discount;
        this.discountAvailable = discountAvailable;

        this.productAvailable = productAvailable;
        this.featured = featured;
        this.latest = latest;

        this.onSale = onSale;
        this.topSelling = topSelling;
        this.hotOffer = hotOffer;
        this.subcatecode = subcatecode;

        this.subcategoryName = subcategoryName;
        this.subCategoryID = subCategoryID;
        this.brandName = brandName;
        this.rowID = rowID;

        this.Type = Type;
        this.ImagePath = ImagePath;
        this.SubTitle = SubTitle;
        this.BannerImage = BannerImage;
        this.frontImage = frontImage;
        this.productImg = productImg;
        this.productSizeColorId = productSizeColorId;
        this.prodColor = prodColor;
        this.prodsize = prodsize;
        this.productSizeColor=productSizeColor;

    }

}


