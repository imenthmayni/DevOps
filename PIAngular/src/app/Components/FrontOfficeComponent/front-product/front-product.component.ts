import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CartItem } from 'src/app/ModelsDHOUHA/CartItem';
import { Product } from 'src/app/ModelsDHOUHA/Product';

@Component({
  selector: 'app-front-product',
  templateUrl: './front-product.component.html',
  styleUrls: ['./front-product.component.css']
})
export class FrontProductComponent implements OnInit {
  products: any[] = [];
  cartItems: CartItem[] = [];
  showCart: boolean = false; // This property controls the visibility of the cart popup
  wishlist: Product[] = []; // Définit le tableau des produits dans la liste de souhaits
  cartId=1;
 searchKey: string = '';
  //averagePrice: number = 0;
  filteredProducts: Product[] = []; 
  constructor(private productService: ProductService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCartItems(); // You might want to implement this method to load cart items when the component initializes
  //  this.filterProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  
  
  addOrUpdateProduct(cartId: number, productId: number, quantity?: number) {
    const effectiveQuantity = quantity || 1;
    this.productService.addOrUpdateProductToCart(cartId, productId, effectiveQuantity).subscribe({
      next: (response) => {
        console.log('Product added or updated in cart', response);
      },
      error: (error) => {
        console.error('Error adding or updating product in cart', error);
      }
    });
  }
  increment(productId: number, currentQuantity: number) {
    const cartItem = this.cartItems.find(item => item.product.productId === productId);
    if (cartItem) {
      const newQuantity = currentQuantity + 1;
      this.productService.updateCartItemQuantity(this.cartId, cartItem.id, newQuantity).subscribe({
        next: (response) => {
          console.log('Quantity updated successfully', response);
          this.loadCartItems(); // Recharge la liste des articles du panier si nécessaire
        },
        error: (error) => {
          console.error('Error updating quantity', error);
        }
      });
    } else {
      console.error('Product not found in cart');
    }
  }
  
  decrement(productId: number, currentQuantity: number) {
    const cartItem = this.cartItems.find(item => item.product.productId === productId);
    if (cartItem) {
      const newQuantity = Math.max(1, currentQuantity - 1);
      this.productService.updateCartItemQuantity(this.cartId, cartItem.id, newQuantity).subscribe({
        next: (response) => {
          console.log('Quantity updated successfully', response);
          this.loadCartItems(); // Rafraîchir la liste des articles du panier si nécessaire
        },
        error: (error) => {
          console.error('Error updating quantity', error);
        }
      });
    } else {
      console.error('Product not found in cart');
    }
  }
  
  loadCartItems(): void {
    const cartId = 1; // Assurez-vous que cela correspond à un cartId valide dans votre application
    this.productService.getCartItemsWithProducts(cartId).subscribe({
      next: (items) => {
        this.cartItems = items; // Assurez-vous que cette ligne met à jour une variable utilisée dans votre template
      },
      error: (error) => {
        console.error('Error fetching cart items', error);
      }
    });
  }

  // getSafeHtml(text: string): SafeHtml {
  // return this.sanitizer.bypassSecurityTrustHtml(text);
  // }
  rotation = 0;
  segments = [
    { color: '#007bff', text: 'Congratulations, you have won a promo code for a discount of 5%! Your code is :', text2:  "saveFivenow", additionalText: "This is a great opportunity to save on your next purchase!" },
    { color: '#45a049', text: 'Congratulations, you have won a promo code for a discount of 10%! Your code is: ',text2:  "save10noWw", additionalText: "Enjoy even bigger savings with your next order." },
    { color: '#ff8400', text: 'Congratulations, you have won a promo code for Free shipping for your next order! Your code is :  ',text2:  "freEShip4U", additionalText: "Free shipping means more money for what you love!" },
    { color: '#ff007b', text: 'Unfortunately, you have not won anything today, try again another time.', additionalText: "Stay tuned for more chances to win!" },
  ];
  selectedSegment?: { color: string; text: string; text2?: string; additionalText?: string };

  
  spin(): void {
    const segmentAngle = 360 / this.segments.length;
    const offset = 10; // Ajustez ce décalage si nécessaire
  
    const desiredSegment = Math.floor(Math.random() * this.segments.length);
    this.selectedSegment = undefined; // Efface le segment sélectionné précédent
  
    const newRotation = 3600 + (desiredSegment * segmentAngle) + offset;
    const element = document.getElementById('wheel');
    if (element) {
      element.style.transition = 'transform 4s ease-out';
      element.style.transform = `rotate(${newRotation}deg)`;
    }
  
    // Retarde l'affichage du texte sélectionné jusqu'à ce que la roue ait fini de tourner
    setTimeout(() => {
      this.selectedSegment = this.segments[desiredSegment];
    }, 4000); // Correspond à la durée de l'animation 'ease-out'
  }


  addToWishlist(product: Product): void {
    this.productService.addToWishlist(product);
  } 

  
  loadWishlist(): void {
    this.productService.wishlistItems.subscribe((items: Product[]) => {
      this.wishlist = items; // Met à jour la wishlist avec les éléments reçus
    });
  }
  removeFromWishlist(product: Product): void {
    // Logique pour supprimer un produit de la liste de souhaits
    // Cela peut impliquer la suppression de l'article du tableau 'wishlist' et la mise à jour de localStorage
    this.productService.removeWishlistItem(product);
    this.loadWishlist(); // Recharge la liste après la suppression
  }
  // filterProducts(): void {
  //   this.filteredProducts = this.products.filter(product =>
  //     product.title.toLowerCase().includes(this.searchKey.toLowerCase()),
  
  //   );
  // } 
  }
  

