import { Injectable } from '@angular/core';
import { DEPOTITEM_ADD_DEPOT_ITEM_URL, DEPOTITEM_GET_DEPOT_ITEM_BY_PRODUCT_ID_URL, DEPOTITEM_MODIFY_DEPOT_ITEM_URL, DEPOTITEM_URL } from '../shared/constant/urls';
import { HttpClient } from '@angular/common/http';
import { DepotItem } from '../shared/models/DepotItem';

@Injectable({
  providedIn: 'root'
})
export class DepotItemService {

  constructor(
    private http : HttpClient
  ) { }

   getAll(){
    return this.http.get<DepotItem[]>(DEPOTITEM_URL);
   }
   getAllByProductId(productId : string){
    return this.http.get<DepotItem[]>(DEPOTITEM_GET_DEPOT_ITEM_BY_PRODUCT_ID_URL+productId)
   }
   add(depotItemData:any){
    return this.http.post(DEPOTITEM_ADD_DEPOT_ITEM_URL,depotItemData);
   }
   update(depotItemData : any,depotItemId : string ){
    return this.http.patch(DEPOTITEM_MODIFY_DEPOT_ITEM_URL + depotItemId,depotItemData);
   }
}
