import { Product } from "./Product";

export class DepotItem{
    productId       !: string;
    stock           !: number;
    price           !: number;
    lastUpdate      !: Date;
    currentDepotId  !: string;
}