import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [TextInputComponent,DefaultButtonComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit{
  resetPasswordFrom!:FormGroup;
  isSubmitted : boolean = false;
  constructor(
    private formBuilder:FormBuilder,
  ){}
  ngOnInit(): void {
    this.resetPasswordFrom = this.formBuilder.group({
      email:['',[Validators.required]]
    },{
      
    });
  }
  get fc(){
    return this.resetPasswordFrom.controls;
  }

  submit(){
    
  }

}
