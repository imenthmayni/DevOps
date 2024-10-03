import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Production } from '../ModelsDHOUHA/Production';
import { ProductionStatus } from '../ModelsDHOUHA/ProductionStatus.enum';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  private readonly API_URL = "http://localhost:8089";
  private readonly PRODUCTION_ADD_API_URL = `${this.API_URL}/productions/add`;
  private readonly PRODUCTION_ALL_API_URL = `${this.API_URL}/productions/all`;
  private readonly PRODUCTION_GET_BY_ID_API_URL = `${this.API_URL}/productions`;
  private readonly PRODUCTION_UPDATE_API_URL = `${this.API_URL}/productions/update`;
  private readonly PRODUCTION_DEL_API_URL = `${this.API_URL}/productions/delete`;
  private readonly UPDATE_STATUS_URL = `${this.API_URL}/productions/status/`;
 // private readonly PROD_DAYS_URL = `${this.API_URL}/productions/totalProductionTimeInDays`;
  private readonly OEEE = `${this.API_URL}/productions/oee/`;
  private readonly CALCUL_QUALITY = `${this.API_URL}/productions/calculateQualité/`;
  private readonly CALCUL_AVAILABILITY = `${this.API_URL}/productions/performance/`;
  private readonly CALCULPERFORMANCE = `${this.API_URL}/productions/calculateAvailability/`;
  private readonly DAY_OF_PROD = `${this.API_URL}/productions/totalProductionTimeDays/`;
  private readonly TAUX_RENDEMENT = `${this.API_URL}/productions/production/yield-rate/`;

  
  constructor(private httpClient: HttpClient) { }
////////////////CRUD
  addProduction(production: Production): Observable<any> {
    return this.httpClient.post(this.PRODUCTION_ADD_API_URL, production);
  }
  getAllProductions(): Observable<Production[]> {
    return this.httpClient.get<Production[]>(`${this.PRODUCTION_ALL_API_URL}`);
  }

  getProductionById(productionId: number): Observable<Production> {
    return this.httpClient.get<Production>(`${this.PRODUCTION_GET_BY_ID_API_URL}/${productionId}`);
  }

  updateProduction(production: Production): Observable<Production> {
    return this.httpClient.put<Production>(`${this.PRODUCTION_UPDATE_API_URL}`, production);
  }

  deleteProduction(productionId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.PRODUCTION_DEL_API_URL}/${productionId}`);
  }
////////////////

updateProductionStatus(productionId: number, newStatus: ProductionStatus): Observable<Production> {
  const url = `${this.UPDATE_STATUS_URL}${productionId}/${newStatus}`;
  return this.httpClient.put<Production>(url, {}).pipe(
    catchError((error) => {
      throw 'Erreur lors de la mise à jour du statut de production: ' + error;
    })
  );
}
////////////////////////////
calculateQuality(productionId: number): Observable<number> {
  return this.httpClient.get<number>(`${this.CALCUL_QUALITY}${productionId}`);
}

calculateAvailability(productionId: number): Observable<number> {
  return this.httpClient.get<number>(`${this.CALCUL_AVAILABILITY}${productionId}`);
}

calculatePerformance(productionId: number): Observable<number> {
  return this.httpClient.get<number>(`${this.CALCULPERFORMANCE}${productionId}`);
}
calculateOEE(productionId: number): Observable<number> {
  return this.httpClient.get<number>(`${this.OEEE}${productionId}`);
}

/////////////////////////////////

getTotalProductionTimeDays(productionId: number): Observable<number> {
  const url = `${this.API_URL}/productions/totalProductionTimeDays/${productionId}`;
  return this.httpClient.get<number>(url);
}

getProductionYieldRate(productionId: number): Observable<number> {
  return this.httpClient.get<number>(`${this.TAUX_RENDEMENT}${productionId}`);
}

}
