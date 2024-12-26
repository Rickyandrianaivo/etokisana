import { Injectable } from '@angular/core';
import { sample_categories } from '../../../data';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../shared/models/ProductCategory';
import { Observable } from 'rxjs';
import { CATEGORY_URL } from '../shared/constant/urls';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http : HttpClient
  ) { }

  getAll(){
    return sample_categories;
  }
  getAllCategory() : Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(CATEGORY_URL);
  }
}
