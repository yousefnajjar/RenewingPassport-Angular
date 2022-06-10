import { Component, OnInit } from '@angular/core';
import { PaymantService } from 'src/app/Services/paymant.service';

@Component({
  selector: 'app-paymant-follow-up',
  templateUrl: './paymant-follow-up.component.html',
  styleUrls: ['./paymant-follow-up.component.css']
})
export class PaymantFollowUpComponent implements OnInit {

  constructor(public paymant:PaymantService) { }

  ngOnInit(): void {
   
    this.paymant.get()
  }

}
