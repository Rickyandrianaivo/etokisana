import { Component } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '../../partials/textarea/textarea.component';

@Component({
  selector: 'app-user-sites',
  standalone: true,
  imports: [HeaderComponent,DefaultButtonComponent,TextInputComponent,TextareaComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './user-sites.component.html',
  styleUrl: './user-sites.component.css'
})
export class UserSitesComponent {
  isSubmitted = false;
  addProductForm!: FormGroup;
  newSite:any;

  constructor(siteser)

  get fc(){
    return this.addProductForm.controls;
  }
  submit(){
    this.isSubmitted =true;
    if (this.addProductForm.invalid){ 
        console.log(this.addProductForm.getError);
        alert("Veuillez remplir correctement les champs obligatoires!");
        return;
      }
    
    const fv = this.addProductForm.value;
    console.log(fv.userName);
    this.newSite = {
      productName       :fv.productName,
      productDescription:fv.productDescription,
      productPrice      :fv.productPrice,
      productCategory   :fv.productCategory,
    };
    // console.log(this.user);
    this..addProduct(this.product).subscribe(_ => {
      alert("adding product successfully!");
      this.router.navigateByUrl("user-products");
    })
  }
}
