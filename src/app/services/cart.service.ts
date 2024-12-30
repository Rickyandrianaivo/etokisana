import { Injectable } from '@angular/core';
import { ICart } from '../shared/Interfaces/ICart';

const CART_KEY = "Cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  private setUserToLocalStorage(Cart:ICart){
    localStorage.setItem(CART_KEY,JSON.stringify(Cart));
  }

  public getUserFromLocalStorage() : ICart{ 
    const cartJson = localStorage.getItem(CART_KEY);
    if (cartJson) return JSON.parse(cartJson) as ICart;
    return new Cart();
    }
}