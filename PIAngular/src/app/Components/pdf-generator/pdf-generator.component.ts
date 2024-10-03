import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CartItem } from 'src/app/ModelsDHOUHA/CartItem';
import { ProductService } from 'src/app/Services/product.service';



@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent {

  cartItems: CartItem[] = [];
  cartId = 1; // Supposons un cartId fixe pour l'exemple
  numberOfItems: number = 0; 
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }


  exportAsPDF(): void {
    let data = document.getElementById('cartContents');
    html2canvas(data!).then(canvas => {
      // Configuration et génération du PDF
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const fileURI = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      pdf.addImage(fileURI, 'PNG', 0, position, fileWidth, fileHeight);
      pdf.save('cart-summary.pdf');
    });
  }

// PANIEEEER
loadCartItems(): void {
  this.productService.getCartItemsWithProducts(this.cartId).subscribe({
    next: (items) => {
      this.cartItems = items;
    },
    error: (error) => {
      console.error('Error fetching cart items', error);
    }
  });
}


formatPrix(value: number): string {
  return value.toFixed(2);
}

getTotalSum(): string {
  const total = this.cartItems.reduce((acc, item) => acc + (item.product.price ?? 0) * item.quantity, 0);
  return this.formatPrix(total);
}





}
