import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/Services/country.service';

@Component({
  selector: 'app-country-profile',
  templateUrl: './country-profile.component.html',
  styleUrls: ['./country-profile.component.css']
})
export class CountryProfileComponent implements OnInit {

  constructor( public country :CountryService) { }

  ngOnInit(): void {
  }

}
