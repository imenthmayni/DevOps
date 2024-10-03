import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Production } from 'src/app/ModelsDHOUHA/Production';
import { ProductionStatus } from 'src/app/ModelsDHOUHA/ProductionStatus.enum';
import { ProductionService } from 'src/app/Services/production.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-add',
  templateUrl: './production-add.component.html',
  styleUrls: ['./production-add.component.css']
})
export class ProductionAddComponent {
  productionForm: FormGroup;
  productionStatusOptions = Object.values(ProductionStatus); 
  


  constructor(
    private formBuilder: FormBuilder,
    private productionService: ProductionService,
    private router: Router
  ) {
    this.productionForm = this.formBuilder.group({
      productionId: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      productionStoppage: [''],
      totalProducts: ['', Validators.required],
      defectiveProducts: [''],
      laborCost: ['', Validators.required],
      rawMaterialCost: ['', Validators.required],
      machineMaintenanceCost: ['', Validators.required],
      productionStatus: [ProductionStatus.EN_COURS, Validators.required] //par défaut

    });
  }

  onSubmit() {
    if (this.productionForm.invalid) {
      return;
    }

    const productionData: Production = this.productionForm.value;
  this.productionService.addProduction(productionData).subscribe(
    () => {
      // Redirection vers la nouvelle URL après l'ajout réussi
      this.router.navigateByUrl('/admin/prod');
      // Réinitialisation du formulaire
      this.productionForm.reset();
    },
    (error) => {
      // Gérer les erreurs
    }
  );
}
}
