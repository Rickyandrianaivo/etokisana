import { Component } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { ClientAreaItemsComponent } from '../../partials/client-area-items/client-area-items.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-client-area',
  standalone: true,
  imports: [
    HeaderComponent,
    ClientAreaItemsComponent,
  ],
  templateUrl: './client-area.component.html',
  styleUrl: './client-area.component.css'
})
export class ClientAreaComponent {
  user:any;
  constructor(
    private userService:UserService,
  ){
    this.user = this.userService.getUserFromLocalStorage();
  }
  ngOnInit():void{
    
  }
}
