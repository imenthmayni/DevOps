// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/ModelsDHOUHA/Product';
import { ProductService } from 'src/app/Services/product.service';
import { ProfileService } from 'src/app/authentication/service/profile.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchKey: string = '';
  //averagePrice: number = 0;
  filteredProducts: Product[] = []; 
  user:any;
  constructor(
    private productService: ProductService,
    private profileService: ProfileService,
        private router: Router  
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.profileService.getUserProfile().subscribe (data => {
      this.user = data
      console.log("thes is the response",data)
    } );
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = [...data];
       // this.calculateAveragePrice();
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  deleteProduct(productId: number | undefined) {
    if (productId !== undefined) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          // Mettez à jour votre liste de produits après la suppression
          this.products = this.products.filter(product => product.productId !== productId);
          console.log('Product deleted successfully.');
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
navigateToProductEdit(productId: number ): void {
  if (productId !== undefined) {
    this.router.navigate(['/admin/product-edit', productId]);
  } else {
    console.error('Product ID is undefined');
  }
}

navigateToProductDetails(productId: number) {
  this.router.navigate(['/product-details', productId]); // Utiliser Router pour naviguer
}

// calculateAveragePrice() {
//   if (this.products.length > 0) {
//     const total = this.products.reduce((sum, product) => sum + (product.price || 0), 0);
//     this.averagePrice = total / this.products.length;
//     console.log(this.averagePrice);  // Pour vérifier le prix moyen calculé
//   } else {
//     this.averagePrice = 0;
//   }
// }

filterProducts(): void {
  this.filteredProducts = this.products.filter(product =>
    product.reference.toLowerCase().includes(this.searchKey.toLowerCase()),

  );
} 
}
