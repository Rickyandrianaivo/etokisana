import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    private userService : UserService,
    private router :Router,
  ){
    
    
  }
}
