import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MouvementStock } from 'src/app/ModelsDHOUHA/MouvementStock';
import { Product } from 'src/app/ModelsDHOUHA/Product';
import { ProductService } from 'src/app/Services/product.service';
import { StockService } from 'src/app/Services/stock.service';


@Component({
  selector: 'app-add-mvt',
  templateUrl: './add-mvt.component.html',
  styleUrls: ['./add-mvt.component.css']
})
export class AddMvtComponent implements OnInit {
  mouvementStockForm!: FormGroup;
  products: Product[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialiser le formulaire
    this.mouvementStockForm = this.formBuilder.group({
      productId: ['', Validators.required],
      dateMouvement: ['', Validators.required],
      typeMouvement: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(0)]]
    });

    // Charger la liste des produits
    this.loadProducts();
  }

  loadProducts(): void {
    // Charger la liste des produits depuis le service
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
      }
    );
  }
  onSubmit(): void {
    if (this.mouvementStockForm.valid) {
      const productId = this.mouvementStockForm.value.productId;

      const mouvementStock: MouvementStock = {
        mvtId: 0,
        dateMouvement: this.mouvementStockForm.value.dateMouvement,
        typeMouvement: this.mouvementStockForm.value.typeMouvement,
        quantite: this.mouvementStockForm.value.quantite,
        product: {} as Product// Assigner l'ID du produit directement
      };

      this.stockService.addMvt(mouvementStock, productId).subscribe(
        (response) => {
          console.log('Mouvement de stock ajouté avec succès', response);
          this.mouvementStockForm.reset();
          this.router.navigate(['/admin/list-mvt']); // Redirection vers la liste des mouvements
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du mouvement de stock', error);
        }
      );
      
    }
  }
}
