import { Component } from '@angular/core';
import { combineLatest, forkJoin } from 'rxjs';
import { Command } from 'src/app/ModelsDHOUHA/Command';
import { CommandPayment } from 'src/app/ModelsDHOUHA/CommandPayment.enum';
import { CommandStatus } from 'src/app/ModelsDHOUHA/CommandStatus.enum';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent {
  commands: Command[] = [];

  startDate: Date | undefined;
  endDate: Date | undefined; 
  selectedStatus: string = '';
  selectedPaymentMethod: string = '';

  commandStatusOptions = Object.values(CommandStatus);
  commandPaymentOptions = Object.values(CommandPayment);
  status: string = ''; 
  paymentMethod: string = ''; 
  searchResults: Command[] = [];


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCommands();
  }
  getCommands(): void {
    this.productService.getCommands().subscribe(
      (commands) => {
        this.commands = commands;
      },
      (error) => {
        console.error('Error fetching commands:', error);
      }
    );
  }


  findCommandsBetweenDates(): void {
    if (this.startDate && this.endDate) {
      this.productService.findCommandsBetweenDates(this.startDate, this.endDate).subscribe(
        (commands) => {
          console.log(commands); // Affiche les commandes dans la console
          this.commands = commands;
        },
        (error) => {
          console.error('Error fetching commands between dates:', error);
          // Afficher une notification ou un message d'erreur à l'utilisateur
        }
      );
    } else {
      console.error('Start date and end date must be specified.');
      // Afficher un message d'erreur à l'utilisateur
    }
  }

  deleteCommand(commandId: number): void {
    this.productService.deleteCommand(commandId).subscribe(
      () => {
        console.log(`Commande avec l'ID ${commandId} supprimée avec succès.`);
        // Mettez à jour votre  utilisateur ou effectuez d'autres actions si nécessaire
      },
      (error) => {
        console.error(`Une erreur s'est produite lors de la suppression de la commande avec l'ID ${commandId}.`, error);
      }
    );
  }
  getCommandsByStatus(status: string | undefined): void {
    if (status) {
      this.productService.findCommandsByStatus(status).subscribe(
        (commands) => {
          this.commands = commands;
        },
        (error) => {
          console.error('Error fetching commands by status:', error);
        }
      );
    }
  }
  
  getCommandsByPaymentMethod(paymentMethod: string | undefined): void {
    if (paymentMethod) {
      this.productService.findCommandsByPaymentMethod(paymentMethod).subscribe(
        (commands) => {
          this.commands = commands;
        },
        (error) => {
          console.error('Error fetching commands by payment method:', error);
        }
      );
    }
  }

  // searchCommands(): void {
  //   if (this.startDate && this.endDate && this.selectedStatus && this.selectedPaymentMethod) {
  //     this.productService.findCommandsByDateStatusAndPayment(this.startDate, this.endDate, this.selectedStatus, this.selectedPaymentMethod)
  //       .subscribe(results => {
  //         this.searchResults = results;
  //       });
  //   } else {
  //     // Gérer le cas où les champs ne sont pas remplis
  //     console.log("Veuillez remplir tous les champs.");
  //   }
  // } 
  
  }
  
  
