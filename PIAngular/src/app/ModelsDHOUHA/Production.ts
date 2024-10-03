import { MouvementStock } from "./MouvementStock";
import { Product } from "./Product";
import { ProductionStatus } from "./ProductionStatus.enum";

export interface Production {
    productionId: number;
    startDate: Date;
    endDate: Date;
    productionStoppage: number;
    totalProducts: number;
    defectiveProducts: number;
    laborCost: number;
    rawMaterialCost: number;
    machineMaintenanceCost: number;
    products: Product[];
    productionStatus: ProductionStatus;
    mouvementsStock: MouvementStock[];
  }