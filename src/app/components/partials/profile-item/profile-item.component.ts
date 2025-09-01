import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TextInputComponent } from "../text-input/text-input.component";
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TextInputComponent
],
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.css'
})
export class ProfileItemComponent {
  modifmode:boolean = false;
  @Input() label : string = "";
  @Input() value : string = "";
  @Input() placeholder : string = "";
  @Input() control = new FormControl();

  @Output() validationButton = new EventEmitter<string[]>();
  
  
  isSubmitted = false;

  get formControl(){
    return this.control as FormControl;
  }

  validateModif(){
    this.validationButton.emit([this.control.value,this.label]);
    console.log(this.label + ":" +this.control.value);
  }

  changeModifMode(){
    this.modifmode = !this.modifmode;
  }
}
