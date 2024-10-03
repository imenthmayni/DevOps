import { CartItem } from "./CartItem";
import { Command } from "./Command";
import { Product } from "./Product";



export class Cart {
    cartId?: number;
    datelastitem?: Date;
    totalAmount?: number;
    subTotal?: number;
    numberOfItems?: number;
     products?: Product[]; 
   command?: Command;

  }