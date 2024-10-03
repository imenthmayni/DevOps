import { Product } from "./Product";
import { TypeMouvement } from "./TypeMouvement.enum";

export interface MouvementStock {
    mvtId: number;
    dateMouvement: Date;
    typeMouvement: TypeMouvement;
    quantite: number;
    product: Product;
  }