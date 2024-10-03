import { Component } from '@angular/core';
import { Command } from 'src/app/ModelsDHOUHA/Command';
import { CommandPayment } from 'src/app/ModelsDHOUHA/CommandPayment.enum';
import { CommandStatus } from 'src/app/ModelsDHOUHA/CommandStatus.enum';
import { User } from 'src/app/ModelsDHOUHA/User';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/servicesChat/user.service';

@Component({
  selector: 'app-checkout-new',
  templateUrl: './checkout-new.component.html',
  styleUrls: ['./checkout-new.component.css']
})
export class CheckoutNewComponent {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  paymentMethod: CommandPayment = CommandPayment.ONLINE_PAYMENT;

  constructor(private userService: UserService, private productService: ProductService) { }

  onSubmit(): void {
    // Récupérer l'ID de l'utilisateur à partir de l'email
    this.productService.getUserIdByEmail(this.email).subscribe(userId => {
      // Créer une nouvelle commande avec le panier par défaut (ID 1)
      const newUser: User = { // Créez un objet User avec les propriétés fournies
        id: userId,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        telephone: parseInt(this.phoneNumber), // Convertir le numéro de téléphone en un nombre
        password: '', // Ajoutez les propriétés manquantes avec des valeurs par défaut
        connected: false,
        deleted: false
      };

      // Créer une nouvelle commande avec le panier par défaut (ID 1)
      const newCommand: Command = {
        commandId: 0,
        dateCommand: new Date().toISOString(),
        commandStatus: CommandStatus.PENDING,
        commandPayment: this.paymentMethod,
        user: newUser, // Assignez l'objet User à la propriété user
        cart: { cartId: 1 } // Assignez directement l'ID du panier
      };

      // Appeler le service pour créer la commande
      this.productService.createOrder(newCommand).subscribe(createdCommand => {
        console.log('Nouvelle commande créée:', createdCommand);
        // Rediriger l'utilisateur vers la page de confirmation de commande ou une autre page appropriée
      });
    });
  }
}
