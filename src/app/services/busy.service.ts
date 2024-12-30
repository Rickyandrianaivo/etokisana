import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  constructor(
    private spnnierService:NgxSpinnerService
  ) { }
  busy(){
    this.busyRequestCount++;
    this.spnnierService;
    this.spnnierService.show(undefined,
      {
        type:'ball-scale-ripple',
        bdColor:'rgba(116, 114, 114, 0.8)',
        color:'#fff',
        size:'default',
      }
    )
  }
  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount<=0){
      this.busyRequestCount=0;
      this.spnnierService.hide();
    }
  }
}
