import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/partials/header/header.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[{provide : MAT_DATE_LOCALE,useValue:'fr'}]
})
export class AppComponent {
  title = 'etokisana';
}
