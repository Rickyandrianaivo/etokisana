import { Component } from '@angular/core';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DefaultButtonComponent,
    RouterLink,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router:Router){

  }
  registerbutton(){
      this.router.navigateByUrl('achat')
      console.log("hit the button")
  }
}
