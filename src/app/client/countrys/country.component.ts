import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/Services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  constructor( public country: CountryService) { }

  ngOnInit(): void {
    this.country.get()
  }

}
