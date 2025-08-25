// import { Product } from "./Product";

// import { DepotItem } from "./DepotItem";

export class CartItem{
    // constructor(depotItem:DepotItem){
    //     this.CartItemProduct = depotItem;
    // }
    depotItem!:string;
    quantity:number = 0;
    price:number = 0;
    get montant():number{
        return this.price * this.quantity;
    }
}