import { Product } from "./Product";

export class CartItem{
    constructor(product:Product){
        this.CartItemProduct = product;
    }
    CartItemProduct!:any;
    CartItemQuantity:number = 0;
    CartItemPrice:number = 0;
    CartItemMontant : number = 0;
    // get CartItemMontant():number{
    //     return this.CartItemPrice * this.CartItemQuantity;
    // }
}