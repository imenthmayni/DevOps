import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from 'src/app/Services/product.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ProductType } from 'src/app/ModelsDHOUHA/ProductType.enum';
import { Product } from 'src/app/ModelsDHOUHA/Product';
@Component({
  selector: 'app-product-edit-component',
  templateUrl: './product-edit-component.component.html',
  styleUrls: ['./product-edit-component.component.css']
})
export class ProductEditComponentComponent implements OnInit {
  productForm: FormGroup;
  productId!: number;
  productTypes = Object.values(ProductType);
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router 
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      tva: ['', Validators.required],
      stock: ['', Validators.required],
      reference: [''],
      image: [''],
      productType: [''], // You might want to make this a dropdown in your form
      createdAt: [{value: ''}], // Assuming creation date is not editable
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue(product);
      },
      error: (error) => {
        console.error('There was an error retrieving the product: ', error);
      }
    });
  }
  updateProduct(): void {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
        next: () => {
          this.router.navigate(['/admin/product-list']); 
        },
        error: (error) => {
          console.error('Error updating product:', error);
        },
      });
    }
  }
  
}
