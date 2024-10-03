import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/ModelsDHOUHA/Product';
import { HttpClient } from '@angular/common/http';
import { ProductionService } from 'src/app/Services/production.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  productions: any[] = []; 

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,  
    private snackBar: MatSnackBar ,
    private httpClient: HttpClient,
    private productionService :ProductionService
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      reference: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      image: [''],
      tva: [0, [Validators.required, Validators.min(0)]],
      createdAt: ['', Validators.required],
      productType: ['', Validators.required],
      productionId: [null, Validators.required] 

    });
  }

  ngOnInit(): void {
    this.getProductions(); 

  }
  getProductions() {
    this.productionService.getAllProductions().subscribe(
      (data) => {
        this.productions = data;
      },
      (error) => {
        console.error('Error fetching productions', error);
      }
    );
  }
  onSubmit(event?: any) {
    if (this.productForm.valid) {
      if (event) {
        this.uploadFile(event);
      }
      const newProduct: Product = { ...this.productForm.value };
      const productionId = this.productForm.get('productionId')!.value; // Get selected productionId from the form

      // Call the method addProductWithBarcodeAndAssignProduction with the selected productionId
      this.productService.addProductWithBarcodeAndAssignProduction(newProduct, productionId).subscribe(
        (result) => {
          console.log('Product added successfully', result);
          this.productForm.reset();
          this.snackBar.open('Product added successfully', 'Close', { duration: 3000 });
        },
        (error) => {
          console.error('Error adding product', error);
          this.snackBar.open('Error adding product', 'Close', { duration: 3000 , panelClass: ['custom-snackbar']});
        }
      );
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      this.httpClient.post('http://localhost:8089/api/uploadFile', formData, { responseType: 'text' })
        .subscribe({
          next: (response) => {
            console.log("Uploaded Successfully:", response);
            // Assigner l'URL de l'image directement au champ 'image'
            this.productForm.get('image')!.setValue(response);
          },
          error: (error) => console.error("Upload Error:", error)
        });
    }
  }
  

}
