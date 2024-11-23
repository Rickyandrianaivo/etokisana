import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required :'Should not be empty',
  email:'Should be an email',
  minlength: 'field is too short',
  notMatch:'Password and confirm does not match'
}

@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  errorMessages:string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() =>{
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(()=> {
      this.checkValidation();
    })
    /**
      */
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
    /**
      */
  }
  checkValidation():void{
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);

   
  }
}
