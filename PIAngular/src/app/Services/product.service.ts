import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';

import { map, switchMap } from 'rxjs/operators'; 

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Product } from '../ModelsDHOUHA/Product';
import { CartItem } from '../ModelsDHOUHA/CartItem';
import { Command } from '../ModelsDHOUHA/Command';
import { forkJoin } from 'rxjs';
import { Review } from '../ModelsDHOUHA/review';

const state = {
  products: JSON.parse(localStorage.getItem('products') || '[]'),
  cart: JSON.parse(localStorage.getItem('cartItem') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('wishlistItems') || '[]'),
  checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')

};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = "http://localhost:8089";
  private readonly PRODUCT_API_URL = `${this.API_URL}/product/addProduct`;
  private readonly GET_ALL_PRODUCTS_API_URL = `${this.API_URL}/product/getallproducts`;
  private readonly DELETE_PRODUCT_API_URL = `${this.API_URL}/product/deleteproduct/`;
  private readonly UPDATE_PRODUCT_API_URL = `${this.API_URL}/product/updateProduct/`;
  private readonly FIND_BY_ID = `${this.API_URL}/product/getProductById/`;
  private readonly ADD_TO_CART = `${this.API_URL}/cart/cartItem/`;
  private readonly GET_CART_ITEM_WITH_PRODUCTS = `${this.API_URL}/cart/getCartItemsWithProducts/`;
  private readonly SUB_TOTAL = `${this.API_URL}/cart/calculate-subtotals/`;
  private readonly UPDATE_CART_ITEM_QUANTITY = `${this.API_URL}/cart/update-item-quantity`;
  private readonly GET_PRODUCT_TYPE_AVERAGE_PRICE = `${this.API_URL}/product/average-price-by-type`;
  private readonly LIKE = `${this.API_URL}/review/like/`;
  private readonly DISLIKE = `${this.API_URL}/review/dislike/`;
  private readonly NBLIKE = `${this.API_URL}/review/nblike/`;
  private readonly NBDISLIKE = `${this.API_URL}/review/nbdislike/`;
  private readonly TOP3 = `${this.API_URL}/product/top3`;
  private readonly REMOVE_FROM_CART = `${this.API_URL}/cart/removeItem/`;
  private readonly GET_COMMANDS = `${this.API_URL}/command/commandes`;
  private readonly CREATE_ORDER_API_URL = `${this.API_URL}/command/addCommande`;
  private readonly DELETE_ORDER_API_URL = `${this.API_URL}/command/deleteCommande/`;
  private readonly FIND_BETWEEN_DATE_API_URL = `${this.API_URL}/command/commands/between-dates/`;
  private readonly FIND_COMMAND_BY_STATUS = `${this.API_URL}/command/by-status/`;
  private readonly FIND_COMMAND_BY_PAY_METHOD = `${this.API_URL}/command/by-payment/`;
  private readonly ADD_REVEIW = `${this.API_URL}/review/reviewtoproduct/`;
  private readonly DEL_REVEIW_BY_PRODUCT = `${this.API_URL}/review/reviews/`;
  private readonly BAR_CODE = `${this.API_URL}/api/barcode/generateBarcode`;
 // private readonly ADD_PRODUCT_WITH_BARCODE_AND_ASSIGN_PRODUCTION_URL = `${this.API_URL}/product/add-with-barcode/`;
  private readonly ADD_AND_ASSIGN_TO_CART = `${this.API_URL}/command/commands/`;
  private readonly EMAIL_USER = `${this.API_URL}/user/getIdByEmail/`;

  


  constructor(private httpClient: HttpClient) { }

  addProduct(product: Product): Observable<any> {
    return this.httpClient.post(this.PRODUCT_API_URL, product);
  }
  // addProduct(formData: FormData) {
  //   return this.httpClient.post(this.PRODUCT_API_URL, formData);
  // }
  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.GET_ALL_PRODUCTS_API_URL);
  }

 
  deleteProduct(productId: number): Observable<string> {
    return this.httpClient.delete(`${this.DELETE_PRODUCT_API_URL}${productId}`, { responseType: 'text' });
  }
  getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.FIND_BY_ID}${productId}`);
  }
  
  // updateProduct(productId: number, productDetails: Product): Observable<any> {
  //   return this.httpClient.put(`${this.UPDATE_PRODUCT_API_URL}${productId}`, productDetails);
  // }
 
  updateProduct(productId: number, product: any): Observable<any> {
    return this.httpClient.put(`${this.UPDATE_PRODUCT_API_URL}${productId}`, product);
  }

/////////////////////////// Panieeeeeeeeeeeer ///////////////////////////////////
addOrUpdateProductToCart(cartId: number, productId: number, quantity: number): Observable<any> {
  // Construit l'URL avec les paramètres directement
  const url = `${this.ADD_TO_CART}${cartId}/${productId}/${quantity}`;
  return this.httpClient.post(url, null); // Passer null si aucun corps n'est nécessaire
}

  getCartItemsWithProducts(cartId: number): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(`${this.GET_CART_ITEM_WITH_PRODUCTS}${cartId}`);
  }
  
  public get cartItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.cart);
      observer.complete();
    });
    return itemsStream as Observable<Product[]>;
  }

  updateCartItemQuantity(cartId: number, cartItemId: number, newQuantity: number): Observable<string> {
    const url = `${this.UPDATE_CART_ITEM_QUANTITY}/${cartId}/${cartItemId}/${newQuantity}`;
    return this.httpClient.put(url, null, { responseType: 'text' });
  }
  
  getProductTypesCount(): Observable<{ type: string, count: number }[]> {
    return this.getAllProducts().pipe(
      map((products: Product[]) => {
        const typesMap = new Map<string, number>();
        products.forEach((product: Product) => {
          const productType = product.productType;
          if (productType !== undefined) {
            const type = productType; 
            if (type) {
              if (typesMap.has(type)) {
                typesMap.set(type, typesMap.get(type)! + 1);
              } else {
                typesMap.set(type, 1);
              }
            }
          }
        });
        return Array.from(typesMap).map(([type, count]) => ({ type, count }));
      })
    );
  }
   

  calculateSubtotals(cartId: number): Observable<any> {
    const url = `${this.SUB_TOTAL}/${cartId}`;
    return this.httpClient.get<any>(url);
  }


    // Get Wishlist Items
    public get wishlistItems(): Observable<Product[]> {
      const itemsStream = new Observable(observer => {
        observer.next(state.wishlist);
        observer.complete();
      });
      return itemsStream as Observable<Product[]>;
    }
  
    // Add to Wishlist
     public addToWishlist(product: Product): any { // Ici, j'ai ajouté le type Product
    const wishlistItem = state.wishlist.find((item: Product) => item.productId === product.productId); // Ajoutez le typage pour item ici
    if (!wishlistItem) {
      state.wishlist.push(product); // Plus besoin de décomposer le produit
      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlist));
      return true;
    }
    return false; // Retourne faux si le produit est déjà dans la wishlist
  }
  
    // Remove Wishlist items
    public removeWishlistItem(product: Product): any {
      const index = state.wishlist.indexOf(product);
      state.wishlist.splice(index, 1);
      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlist));
      return true;
    }

    getProductTypeAveragePrice(): Observable<any> {
      return this.httpClient.get<any>(this.GET_PRODUCT_TYPE_AVERAGE_PRICE);
    }
    removeFromCart(cartItemId: number): Observable<any> {
      return this.httpClient.delete(`${this.REMOVE_FROM_CART}${cartItemId}`);
    }
  ///////////////////LIKE AND DISLIKE
  likeProduct(userId: number, productId: number): Observable<any> {
    return this.httpClient.post(`${this.LIKE}${userId}/${productId}`, {});
  }

  dislikeProduct(userId: number, productId: number): Observable<any> {
    return this.httpClient.post(`${this.DISLIKE}${userId}/${productId}`, {});
  }

  numberOfLikes(productId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.NBLIKE}${productId}`);
  }

  numberOfDislikes(productId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.NBDISLIKE}${productId}`);
  }
  getTop3MostLikedProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.TOP3}`);
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


  //////////////////////////////// Commandeeeeeeeeeeeeeeeeee ///////////////////////////////////
  // *******************************************************************************************
  // *******************************************************************************************

    getCommands(): Observable<Command[]> {
      return this.httpClient.get<Command[]>(this.GET_COMMANDS);
    }
    createOrder(command: Command): Observable<Command> {
      return this.httpClient.post<Command>(this.CREATE_ORDER_API_URL, command);
    }
  
    deleteCommand(commandId: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.DELETE_ORDER_API_URL}${commandId}`);
    }
    
    findCommandsBetweenDates(start: Date, end: Date): Observable<Command[]> {
      const url = `${this.FIND_BETWEEN_DATE_API_URL}${start}/${end}`;
      return this.httpClient.get<Command[]>(url);
    }
    findCommandsByStatus(status: string): Observable<Command[]> {
      return this.httpClient.get<Command[]>(`${this.FIND_COMMAND_BY_STATUS}${status}`);
    }
  
    findCommandsByPaymentMethod(payment: string): Observable<Command[]> {
      return this.httpClient.get<Command[]>(`${this.FIND_COMMAND_BY_PAY_METHOD}${payment}`);
    }

    // findCommandsByDateStatusAndPayment(start: Date, end: Date, status: string, payment: string): Observable<Command[]> {
    //   // Combinez les résultats des trois appels de méthode
    //   return combineLatest([
    //     this.findCommandsBetweenDates(start, end),
    //     this.findCommandsByStatus(status),
    //     this.findCommandsByPaymentMethod(payment)
    //   ]).pipe(
    //     // Utilisez map pour traiter les résultats combinés et obtenir les commandes qui correspondent à tous les critères
    //     map(([commandsByDate, commandsByStatus, commandsByPayment]) => {
    //       // Faites ici le traitement nécessaire pour combiner les trois résultats
    //       // Par exemple, vous pouvez filtrer les commandes qui correspondent aux trois critères
    //       const filteredCommands = commandsByDate.filter(command =>
    //         commandsByStatus.some(statusCommand => statusCommand.commandId === command.commandId) &&
    //         commandsByPayment.some(paymentCommand => paymentCommand.commandId === command.commandId)
    //       );
    //       return filteredCommands;
    //     })
    //   );
    // }
    createCommandAndAssignCart(cartId: number, userEmail: string): Observable<Command> {
      const url = `${this.ADD_AND_ASSIGN_TO_CART}${cartId}/${userEmail}`;
      return this.httpClient.post<Command>(url, null);
    }

  //   /////////////////////////// Reviewwwwwwwwwwwwwwwwwwww ///////////////////////////////////
  // *******************************************************************************************
  // *******************************************************************************************



    addReviewToProduct(userId: number, productId: number, review: Review): Observable<Review> {
      return this.httpClient.post<Review>(`${this.ADD_REVEIW}${userId}/${productId}`, review);
    }

    deleteReviewByProductId(productId: number): Observable<string> {
      const url = `${this.DEL_REVEIW_BY_PRODUCT}${productId}`;
      return this.httpClient.delete<string>(url);
    }


 // Méthode pour ajouter un produit avec code à barres
//  addProductWithBarcode(product: Product): Observable<Product> {
//   return this.httpClient.post<Product>(this.ADD_PRODUCT_WITH_BARCODE_URL, product);
// }

// addProductWithBarcodeAndAssignProduction(product: Product, productionId: number): Observable<Product> {
//   const url = `${this.ADD_PRODUCT_WITH_BARCODE_AND_ASSIGN_PRODUCTION_URL}${productionId}`;
//   return this.httpClient.post<Product>(url, product);
// }

addProductWithBarcodeAndAssignProduction(product: Product, productionId: number): Observable<Product> {
  const url = `${this.API_URL}/product/add-with-barcode/${productionId}`;
  return this.httpClient.post<Product>(url, product);
}
//  addProductWithBarcode(product: Product): Observable<any> {
//   // Appel du service pour générer le code à barres
//   return this.generateBarcode(product.reference).pipe(
//     // Une fois le code à barres généré, associez-le au produit
//     map(barcodeBlob => {
//       // Convertir le blob en URL
//       const reader = new FileReader();
//       reader.readAsDataURL(barcodeBlob);
//       reader.onloadend = () => {
//         // Associer l'URL du code à barres au produit
//         product.barcode = reader.result as string;
//         // Ajouter le produit à votre système de stockage de produits
//         // Par exemple, vous pouvez l'envoyer à une API backend pour l'enregistrer dans une base de données
//         return this.addProduct(product);
//       };
//     })
//   );
// }

    generateBarcode(barcodeValue: string): Observable<Blob> {
      return this.httpClient.post<Blob>(this.BAR_CODE, barcodeValue, { responseType: 'blob' as 'json' });
    }
    
 
    getUserIdByEmail(email: string): Observable<number> {
      const url = `${this.EMAIL_USER}${email}`;
      return this.httpClient.get<number>(url);
    }
     getPhoto(photo: string): string{
      const photoUrl = `${this.API_URL}/download/${photo}`;
      console.log(photoUrl)
      return `${this.API_URL}/download/${photo}`;
    }
  }



