import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../../shared/models/Product';

@Component({
  selector: 'app-user-products',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './user-products.component.html',
  styleUrl: './user-products.component.css'
})
export class UserProductsComponent {
  displayedColumns: string[] = ['Nom', 'Descritpion', 'Unité', 'Prix Unitaire'];
  dataSource : Product[] = [];
}
