import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NOTIFICATION_ADD_URL, NOTIFICATION_BY_ID_URL, NOTIFICATION_BY_OWNER_URL, NOTIFICATION_REMOVE_URL, NOTIFICATION_UPDATE_URL, NOTIFICATION_URL } from '../shared/constant/urls';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
    constructor(
      private http:HttpClient,
    ) { }
    getAll() : Observable<Notification[]>{
      return this.http.get<Notification[]>(NOTIFICATION_URL);
    }    
    getNotificationById(id:string) : Observable<Notification>{
      return this.http.get<Notification>(NOTIFICATION_BY_ID_URL+id);
    }
    getNotificationByOwner(NotificationID:string) : Observable<Notification[]>{
      return this.http.get<Notification[]>(NOTIFICATION_BY_OWNER_URL+NotificationID);
    }
    addNotification(NotificationData:Notification):Observable<Notification>{
      return this.http.post<Notification>(NOTIFICATION_ADD_URL,NotificationData);
    }
    updateNotification( NotificationID:string,newNotificationData:Notification):Observable<Notification>{
      console.log(newNotificationData);
      return this.http.put<Notification>(NOTIFICATION_UPDATE_URL+NotificationID,newNotificationData);
    }
    deleteNotification(NotificationId:string){
      return this.http.delete(NOTIFICATION_REMOVE_URL+NotificationId);
    }
}
