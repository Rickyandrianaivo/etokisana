import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { PRODUCT_ADD_URL, PRODUCT_BY_CATEGORY_URL, PRODUCT_BY_SEARCH_URL, PRODUCT_UPDATE_URL, PRODUCT_UPLOAD_IMAGE_URL, PRODUCT_URL } from '../shared/constant/urls';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { sample_products } from '../../../data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient,
  ) { }

  getAll(){
    return sample_products;
  }
  getOffreSpecial(){
    const offreSpecial = sample_products.filter((product:Product)=>product.productState == "Speciale")
    return offreSpecial;
  }
  getByCat(CatName : string){
    const productCat = sample_products.filter(product => product.productCategory == CatName) ;
    return productCat;
  }
  // getAll() : Observable<Product[]>{
  //   return this.http.get<Product[]>(PRODUCT_URL);
  // }

  getProductById(id:string) : Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCT_URL+id);
  }
  getProductByCategory(category:string):Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCT_BY_CATEGORY_URL+category);
  }
  

  getProductBySearch(searchTerm:string):Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCT_BY_SEARCH_URL+searchTerm);
  }
  addProduct(productData:Product):Observable<Product>{
    return this.http.post<Product>(PRODUCT_ADD_URL,productData);
  }
  updateProduc(newProductData:Product):Observable<Product>{
    return this.http.put<Product>(PRODUCT_UPDATE_URL,newProductData);
  }
  uploadFile(formData:FormData){
    console.log("image uploaded !! ")
    return this.http.post(PRODUCT_UPLOAD_IMAGE_URL, formData)
  }
}
