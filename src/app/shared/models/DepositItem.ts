import { Product } from "./Product";

export class DepositItem{
    constructor(product:Product){
        this.depositItemProduct = product;
    }
    depositItemProduct!:any;
    depositItemQuantity!:number;
}