import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/ModelsDHOUHA/Product';
import { Review } from 'src/app/ModelsDHOUHA/review';

import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-front-detail',
  templateUrl: './front-detail.component.html',
  styleUrls: ['./front-detail.component.css']
})
export class FrontDetailComponent {
  product: Product | undefined;
  userId: number = 1; // Exemple statique, remplacez par la récupération réelle de l'ID de l'utilisateur
  reviewTitle: string = '';
  reviewText: string = ''; 
  rating: number = 0; 
  ratingLabel: string = "";



  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe({
        next: (product: Product) => this.product = product,
        error: (error) => console.error('Error loading product:', error)
      });
    }
  }

  likeProduct() {
    if (this.product && this.product.productId) {
      this.productService.likeProduct(this.userId, this.product.productId).subscribe({
        next: (response) => console.log('Produit aimé avec succès', response),
        error: (error) => console.error('Erreur lors du like du produit', error)
      });
    }
  }

  dislikeProduct() {
    if (this.product && this.product.productId) {
      this.productService.dislikeProduct(this.userId, this.product.productId).subscribe({
        next: (response) => console.log('Produit n\'a pas été aimé', response),
        error: (error) => console.error('Erreur lors du dislike du produit', error)
      });
    }
  }

  submitReview(): void {
    if (this.product) {
      const review: Review = {
        reviewId: 0,
        reviewTitle: this.reviewTitle,
        reviewText: this.reviewText,
        verified: false,
        rating: this.rating
      };
  
      this.productService.addReviewToProduct(this.userId, this.product.productId, review).subscribe(
        (response) => {
          console.log('Review added successfully:', response);
          // Réinitialiser le formulaire ou effectuer d'autres actions après l'ajout de la revue
          this.reviewTitle = '';
          this.reviewText = '';
          this.rating = 0;
        },
        (error) => {
          console.error('Failed to add review:', error);
        }
      );
    } else {
      console.error('Product not loaded');
    }
  }

  updateRating(value: number) {
    this.rating = value;
    switch(value) {
      case 1:
        this.ratingLabel = "Terrible";
        break;
      case 2:
        this.ratingLabel = "Bad";
        break;
      case 3:
        this.ratingLabel = "OK";
        break;
      case 4:
        this.ratingLabel = "Good";
        break;
      case 5:
        this.ratingLabel = "Excellent";
        break;
      default:
        this.ratingLabel = "";
        break;
    }
  }
  

  
}
