import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
// subscriptions : Subscription[] = [];

  // @Input()
  isLoged : boolean = true;
  user?:User;

  constructor(
    private userService : UserService,
    private router:Router
    ) { 
    this.user = this.userService.getUserFromLocalStorage()
    // if (!this.user.name || !this.user.password) {
    //   this.isLoged = false;
    // }
    if(this.user){
      this.isLoged = true;
    }
  }

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigateByUrl('/login');
    }else{
      this.isLoged = true
    }
  }

  logOut(){
    this.isLoged = false;
    this.userService.logout();
  }
}
