import { Component, Input } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatInputModule],
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.css'
})
export class ProfileItemComponent {
  @Input()
  label:string="";
  @Input()
  value:string="";
}
