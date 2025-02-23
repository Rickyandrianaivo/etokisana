import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CategoryService } from 'src/app/services/category.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DefaultButtonComponent } from 'src/app/components/partials/default-button/default-button.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    SideBarComponent,
    MatTableModule,
    MatIconModule,
    RouterLink,
    DefaultButtonComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categoriesList:any[]=[]
  displayedColumns: string[] = ['Miniature','Nom', 'Description','Action'];
  constructor(
    private categoryService:CategoryService,
  ){
    this.categoryService.getAllCategory().subscribe(categoryAll=>{
      this.categoriesList = categoryAll;
    })
  }

  deleteCat(catId:string){
    this.categoryService.deleteCat(catId);
  }
}
