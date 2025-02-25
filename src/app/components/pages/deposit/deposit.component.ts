import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
  
  constructor(
    private userService:UserService,
    private transactionservice:TransactionService, 
  ){}
}
