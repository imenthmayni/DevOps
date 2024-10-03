import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from 'src/app/ModelsDHOUHA/CartItem';

import { ProductService } from 'src/app/Services/product.service';
import { SigninComponent } from 'src/app/authentication/component/signin/signin.component';
import { UserService } from 'src/app/authentication/service/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  email: string = '';
  password: string = '';
  cartItems: CartItem[] = [];
  cartId = 1; // Supposons un cartId fixe pour l'exemple
  numberOfItems: number = 0; 
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal

  ) {
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      government: ['', Validators.required],
      postalcode: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}$/), // Valide un code postal de 4 chiffres.
        Validators.maxLength(4)
      ]],  
      commandPayment: ['', Validators.required],
      commandStatus: [''],

  });
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
  calculateNumberOfItems(): void {
    this.numberOfItems = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }
  ngOnInit(): void {
    this.loadCartItems();
    const commandPaymentControl = this.checkoutForm.get('commandPayment');
    const commandStatusControl = this.checkoutForm.get('commandStatus');

    if (commandPaymentControl && commandStatusControl) {
      commandPaymentControl.valueChanges.subscribe(value => {
        if (value === 'CASH_ON_DELIVERY') {
          commandStatusControl.setValue('UNPAID');
        } else if (value === 'ONLINE_PAYMENT') {
          commandStatusControl.setValue('PENDING');
        }
      });
    }
  }
 
  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const currentDate = new Date().toISOString(); // Génère la date système au format ISO
      const orderDetails = {
        ...this.checkoutForm.value,
        dateCommand: currentDate,
      };
      
      console.log(orderDetails);
      
      this.productService.createOrder(orderDetails).subscribe({
        next: (response) => console.log('Commande créée avec succès:', response),
        error: (error) => console.error('Erreur lors de la création de la commande:', error),
        
      });
      this.router.navigateByUrl('/facture');

    }
  }
  
  openSignInModal(): void {
    const modalRef = this.modalService.open(SigninComponent, { centered: true });
    modalRef.componentInstance.closeModal.subscribe(() => {
      modalRef.close();
    });
  }

    // Enregistrer les informations de l'utilisateur
    // private saveUserInformation(): void {
    //   const userData = {
    //     email: this.checkoutForm.value.email,
    //     // Vous pouvez ajouter d'autres champs d'informations de l'utilisateur ici
    //   };
  
    //   this.userService.createUser(userData).subscribe({
    //     next: (response) => console.log('Utilisateur créé avec succès:', response),
    //     error: (error) => console.error('Erreur lors de la création de l\'utilisateur:', error)
    //   });
    // }

    formatPrix(value: number): string {
      return value.toFixed(2);
    }
  
    getTotalSum(): string {
      const total = this.cartItems.reduce((acc, item) => acc + (item.product.price ?? 0) * item.quantity, 0);
      return this.formatPrix(total);
    }
    
}
