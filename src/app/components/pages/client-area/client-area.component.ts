import { Component } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { ClientAreaItemsComponent } from '../../partials/client-area-items/client-area-items.component';
import { UserService } from '../../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-area',
  standalone: true,
  imports: [
    ClientAreaItemsComponent,
    
  ],
  templateUrl: './client-area.component.html',
  styleUrl: './client-area.component.css'
})
export class ClientAreaComponent {
  user:any;
  link!:string;
  constructor(
    private userService:UserService,
  ){
    this.user = this.userService.getUserFromLocalStorage();
  }
  ngOnInit():void{
    
  }
}
