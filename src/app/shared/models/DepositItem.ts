import { Product } from "./Product";

export class DepositItem{
    constructor(product:Product){
        this.product = product;
    }
    product!:any;
    stock!:number;
    prix!:number;
    lastUpdate!:Date;
}