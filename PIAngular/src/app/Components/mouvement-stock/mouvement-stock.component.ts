import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MouvementStock } from 'src/app/ModelsDHOUHA/MouvementStock';
import { StockService } from 'src/app/Services/stock.service';

@Component({
  selector: 'app-mouvement-stock',
  templateUrl: './mouvement-stock.component.html',
  styleUrls: ['./mouvement-stock.component.css']
})
export class MouvementStockComponent {
  mouvements: MouvementStock[] = [];

  constructor(private router: Router,private stockService: StockService) { }

  ngOnInit(): void {
    this.loadMouvements();
  }

  loadMouvements(): void {
    this.stockService.getAllMouvements().subscribe(
      (mouvements) => {
        this.mouvements = mouvements;
      },
      (error) => {
        console.error('Error loading mouvements', error);
      }
    );
  }

  deleteMouvement(mvtId: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce mouvement de stock ?')) {
      this.stockService.deleteMouvement(mvtId).subscribe(
        () => {
          // Supprimer le mouvement de stock de la liste locale après la suppression réussie
          this.mouvements = this.mouvements.filter(m => m.mvtId !== mvtId);
          console.log('Mouvement de stock supprimé avec succès.');
        },
        (error) => {
          console.error('Erreur lors de la suppression du mouvement de stock', error);
        }
      );
    }
  }
  navigateToMouvementEdit(mvtId: number): void {
    this.router.navigate(['/edit-mouvement', mvtId]);
  }
}
