import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MouvementStock } from '../ModelsDHOUHA/MouvementStock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly API_URL = "http://localhost:8089";
  private readonly MVT_STOCK_ADD_API_URL = `${this.API_URL}/stock/addMvt/`;
  private readonly GET_ALL_MVT = `${this.API_URL}/stock/allMvt/`;
  private readonly GET_BY_ID_MVT = `${this.API_URL}/stock/retrieve/`;
  private readonly UPDATE_MVT = `${this.API_URL}/stock/updateMvt`;
  private readonly DEL_MVT = `${this.API_URL}/stock/delete/`;
  private readonly CURRENT_STOCK = `${this.API_URL}/stock/currentStock/`;
  private readonly AVERAGE_CONSUMPTION = `${this.API_URL}/stock/averageConsumption/`;

  
  
  constructor(private httpClient: HttpClient) { }
// CRUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUD
  addMvt(mouvementStock: MouvementStock, productId: number): Observable<MouvementStock> {
    return this.httpClient.post<MouvementStock>(`${this.MVT_STOCK_ADD_API_URL}${productId}`, mouvementStock);
  }
 
  getAllMouvements(): Observable<MouvementStock[]> {
    return this.httpClient.get<MouvementStock[]>(`${this.GET_ALL_MVT}`);
  }

  getMouvementById(mvtId: number): Observable<MouvementStock> {
    return this.httpClient.get<MouvementStock>(`${this.GET_BY_ID_MVT}${mvtId}`);
  }

  updateMouvement(mouvementStock: MouvementStock): Observable<MouvementStock> {
    return this.httpClient.put<MouvementStock>(`${this.UPDATE_MVT}`, mouvementStock);
  }

  deleteMouvement(mvtId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.DEL_MVT}${mvtId}`);
  }


  getCurrentStock(productId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.CURRENT_STOCK}${productId}`);
  }
/////////////////
getAverageConsumption(productId: number): Observable<number> {
  const url = `${this.AVERAGE_CONSUMPTION}${productId}`;
  return this.httpClient.get<number>(url);
}

}
