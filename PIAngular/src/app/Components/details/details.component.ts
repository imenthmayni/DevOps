import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/ModelsDHOUHA/Product';
import { ProductService } from 'src/app/Services/product.service';
import { StockService } from 'src/app/Services/stock.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: Product | undefined;
  currentStock: number = 0;
  barcodeImageUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe({
        next: (product: Product) => {
          this.product = product;
          this.getProductCurrentStock(+productId);
          // Générer le code à barres pour la référence du produit
          this.generateBarcode(product.reference);
        },
        error: (error) => {
          console.error('Error loading product:', error);
        }
      });
    }
  }

  getProductCurrentStock(productId: number): void {
    this.stockService.getCurrentStock(productId).subscribe(
      (stock: number) => {
        this.currentStock = stock;
        console.log('Current stock:', this.currentStock);
      },
      (error) => {
        console.error('Error fetching current stock:', error);
      }
    );
  }

  generateBarcode(barcodeValue: string): void {
    // Utilisez votre service ProductService pour générer le code à barres
    this.productService.generateBarcode(barcodeValue).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.barcodeImageUrl = reader.result as string;
        };
        reader.readAsDataURL(data);
      },
      (error: any) => {
        console.error('Error generating barcode:', error);
      }
    );
  }
  getProductPhototUrl(product: Product): string {
    return this.productService.getPhoto(product.image);  
  }
}
