import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent {
  barcodeValue: string = '';
  barcodeImageUrl: string | ArrayBuffer | null = null;

  constructor(private barcodeService: ProductService) { }

  generateBarcode(): void {
    this.barcodeService.generateBarcode(this.barcodeValue).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.barcodeImageUrl = reader.result;
        };
        reader.readAsDataURL(data);
      },
      (error: any) => {
        console.error('Error generating barcode:', error);
      }
    );
  }
  }

