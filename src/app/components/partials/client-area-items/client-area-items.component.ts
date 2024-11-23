import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-client-area-items',
  standalone: true,
  imports: [],
  templateUrl: './client-area-items.component.html',
  styleUrl: './client-area-items.component.css'
})
export class ClientAreaItemsComponent {
  @Input()
  title!: string;
  @Input()
  imageUrl!: string;
  @Input()
  link!: string;
}
