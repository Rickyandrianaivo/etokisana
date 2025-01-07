import { Injectable } from '@angular/core';
import { ICart } from '../shared/Interfaces/ICart';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../shared/models/Product';
import { CartItem } from '../shared/models/CartItem';

const CART_KEY = "Cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
  
  // addToCart(product:any):void{
  //   let cartItem = this.cart.items.find(item => item.CartItemProduct._id === product.id);
  //   if(cartItem){
  //     this.changeQuantity(product._id, cartItem.CartItemQuantity + 1);
  //     return;
  //   }
  //   this.cart.items.push(new CartItem());
  //   this.setCartToLocalStorage();
  // }

  // removeFromCart(productId:number): void{
  //   this.cart.items =
  //   this.cart.items.filter(item => item.product.id != productId);
  //   this.setCartToLocalStorage();
  // }

  // changeQuantity(productId:number, quantity:number){
  //   let cartItem = this.cart.items.find(item => item.product.id === productId);
  //   if(!cartItem) return;
  //   cartItem.quantity = quantity;
  //   cartItem.price = quantity * cartItem.product.price;
  //   this.setCartToLocalStorage();
  // }

  // clearCart(){
  //   this.cart = new Cart();
  //   this.setCartToLocalStorage();
  // }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }
  getCart(): Cart{
    return this.cartSubject.value;
  }
  // private setCartToLocalStorage():void{
  //   this.cart.totalPrice = this.cart.items
  //   .reduce((prevSum,currentItem)=> prevSum + currentItem.price, 0);
  //   this.cart.totalCount = this.cart.items
  //   .reduce((prevSum,currentItem) => prevSum + currentItem.quantity,0)
  //   const cartJson = JSON.stringify(this.cart);
  //   localStorage.setItem('Cart',cartJson);

  //   this.cartSubject.next(this.cart);
  // }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }
}