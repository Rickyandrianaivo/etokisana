import { Product } from "./Product";

export class CartItem{
    constructor(product:Product){
        this.CartItemProduct = product;
    }
    CartItemProduct!:any;
    CartItemQuantity!:number;

    get CartItemPrice():number{
        return this.CartItemProduct.productPrice * this.CartItemQuantity;
    }
}