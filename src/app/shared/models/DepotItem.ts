import { Product } from "./Product";

export class DepotItem{
    _id ?: string;
    productId !: string;
    stock!: number;
    price   !: number;
    lastUpdate !: Date;
    currentDepotId !: string;
}