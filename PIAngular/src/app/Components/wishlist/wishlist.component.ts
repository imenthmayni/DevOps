import { Component } from '@angular/core';
import { Product } from 'src/app/ModelsDHOUHA/Product';

import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishlist: Product[] = []; // Définit le tableau des produits dans la liste de souhaits

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.productService.wishlistItems.subscribe((items: Product[]) => {
      this.wishlist = items; // Met à jour la wishlist avec les éléments reçus
    });
  }

  addToWishlist(product: Product): void {
    console.log('Adding product to wishlist:', product);
    this.productService.addToWishlist(product);
    this.loadWishlist(); // Recharge la liste après l'ajout
  }

  removeFromWishlist(product: Product): void {
    console.log('Removing product from wishlist:', product);
    this.productService.removeWishlistItem(product);
    this.loadWishlist(); // Recharge la liste après la suppression
  }


}
