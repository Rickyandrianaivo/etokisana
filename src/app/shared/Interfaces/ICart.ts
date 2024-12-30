import { CartItem } from "../models/CartItem";

export interface ICart{
    CartItem:CartItem[];
    CartTotal:number;
}