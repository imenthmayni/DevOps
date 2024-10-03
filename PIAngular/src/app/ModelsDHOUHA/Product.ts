import { Cart } from "./Cart";
import { CartItem } from "./CartItem";
import { ProductType } from "./ProductType.enum";
import { Production } from "./Production";


export interface Product {

    productId: number;
    quantity?: number;
    reference: string;
    title?: string;
    image: string;
    description?: string;
    stock?: number;
    price?: number;
    tva: number;
    createdAt?: Date;
    productType?: ProductType; 
    likes?: number;
    dislikes?: number;
    barcode?: string;
    //cart!: Cart;
    //cartItems!: CartItem[];
    averageConsumption?: number; // Ajout de la propriété averageConsumption
    production: Production;
    
  }

