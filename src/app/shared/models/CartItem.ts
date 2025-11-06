// import { Product } from "./Product";

import { DepotItem } from "./DepotItem";

// import { DepotItem } from "./DepotItem";

export class CartItem{
    // constructor(depotItem:DepotItem){
    //     this.CartItemProduct = depotItem;
    // }
    depotItem!:DepotItem;
    quantity:number = 0;
    price:number = 0;
    get montant():number{
        return this.price * this.quantity;
    }
}