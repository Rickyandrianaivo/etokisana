import { Injectable } from '@angular/core';
import { Site } from '../shared/models/Sites';
import { SITE_ADD_URL, SITE_BY_ID_URL, SITE_REMOVE_URL, SITE_UPDATE_URL, SITE_URL } from '../shared/constant/urls';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http : HttpClient) { }

  getAll() : Observable<Site[]>{
      return this.http.get<Site[]>(SITE_URL);
  }
  getSiteById(SiteId :string) : Observable<Site>{
    console.log(SITE_BY_ID_URL+SiteId)
    return this.http.get<Site>(SITE_BY_ID_URL+ SiteId);
  }
  addSite(SiteData:Site):Observable<Site>{
    return this.http.post<Site>(SITE_ADD_URL,SiteData);
  }
  update(updateData : any, SiteId : string){
    return this.http.put<Site>(SITE_UPDATE_URL + SiteId, updateData)
  }
  deleteSite(SiteId:string){
    return this.http.delete(SITE_REMOVE_URL+SiteId);
  }

}
