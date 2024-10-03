import { Component, OnInit, HostListener, ViewChild  } from '@angular/core';
import { Observable } from 'rxjs';
import { Production } from 'src/app/ModelsDHOUHA/Production';
import { ProductionStatus } from 'src/app/ModelsDHOUHA/ProductionStatus.enum';
import { ProductionService } from 'src/app/Services/production.service';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.css']
})
export class ProductionsComponent implements OnInit {
  productions: Production[] = []; // Initialisez un tableau de productions vide
  productionStatus = ProductionStatus;
  completedProductions: Production[] = [];
  inProgressProductions: Production[] = [];

  @ViewChild('inProgressDropList', { static: true }) inProgressDropList!: CdkDropList<Production[]>;
  @ViewChild('breakdownDropList', { static: true }) breakdownDropList!: CdkDropList<Production[]>;
  @ViewChild('delayedDropList', { static: true }) delayedDropList!: CdkDropList<Production[]>;
  @ViewChild('cancelledDropList', { static: true }) cancelledDropList!: CdkDropList<Production[]>;

  constructor(private productionService: ProductionService) {}

  ngOnInit(): void {
    this.loadProductions();
  }

  loadProductions() {
    this.productionService.getAllProductions().subscribe(
      (data) => {
        this.productions = data;
      },
      (error) => {
        console.error('Error fetching productions', error);
      }
    );
  }

  deleteProduction(productionId: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce mouvement de stock ?')) {
      this.productionService.deleteProduction(productionId).subscribe(
        () => {
          // Remove the production from the local list after successful deletion
          this.productions = this.productions.filter(p => p.productionId !== productionId);
          console.log('Mouvement de stock supprimé avec succès.');
        },
        (error) => {
          console.error('Erreur lors de la suppression du mouvement de stock', error);
        }
      );
    }
  }
  

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.productions, event.previousIndex, event.currentIndex);
  } 
}