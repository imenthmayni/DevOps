import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CartItem } from 'src/app/ModelsDHOUHA/CartItem';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartId = 1; // Supposons un cartId fixe pour l'exemple
  numberOfItems: number = 0; 
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.productService.getCartItemsWithProducts(this.cartId).subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateNumberOfItems(); 
      },
      error: (error) => {
        console.error('Error fetching cart items', error);
      }
    });
  }


  formatPrix(value: number): string {
    return value.toFixed(2);
  }

  getTotalSum(): string {
    const total = this.cartItems.reduce((acc, item) => acc + (item.product.price ?? 0) * item.quantity, 0);
    return this.formatPrix(total);
  }

  removeItem(cartItemId: number): void {
    this.productService.removeFromCart(cartItemId).subscribe({
      next: () => {
        // rafraîchir la liste des articles du panier
        this.loadCartItems();
      },
      error: (error) => {
        console.error('Error removing item from cart', error);
      }
    });
 
 
 }
 increaseQuantity(cartItemId: number, currentQuantity: number): void {
  const newQuantity = currentQuantity + 1;
  this.productService.updateCartItemQuantity(this.cartId, cartItemId, newQuantity).subscribe(() => {
    this.loadCartItems(); 
    this.calculateNumberOfItems();// Rafraîchir la liste des articles du panier après la mise à jour
  });
}

decreaseQuantity(cartItemId: number, currentQuantity: number): void {
  const newQuantity = Math.max(1, currentQuantity - 1); // Empêcher la quantité de descendre en dessous de 1
  this.productService.updateCartItemQuantity(this.cartId, cartItemId, newQuantity).subscribe(() => {
    this.loadCartItems();
    this.calculateNumberOfItems(); // Rafraîchir la liste des articles du panier après la mise à jour
  });
}
calculateNumberOfItems(): void {
  this.numberOfItems = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
}


}

