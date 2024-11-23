import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { InputContainerComponent } from '../input-container/input-container.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [
    InputValidationComponent,
    InputContainerComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  @Input()
  label!: string;
  @Input()
  type: 'text' |'password' |'email' = 'text';
  
  get formControl(){
    return this.control as FormControl;
  }
  ngOnInit(): void {
  }
}
