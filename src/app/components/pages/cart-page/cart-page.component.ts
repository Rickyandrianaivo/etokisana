import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { HeaderComponent } from '../../partials/header/header.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    HeaderComponent,
    NgFor,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{
  cart !: Cart;
  // cartItems:CartItem[]=[];
  constructor(
    private cartService: CartService
  ){
  }
  ngOnInit(): void {
    this.setCart();
  }
  setCart(){
    this.cart = this.cartService.getCart();
  }
  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.depotItem);
    this.setCart();
  }
  changeQuantity(cartItem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.depotItem,quantity);
    this.setCart();
  }
}
