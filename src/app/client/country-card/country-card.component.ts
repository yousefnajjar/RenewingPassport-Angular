import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/Services/country.service';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css']
})
export class CountryCardComponent implements OnInit {

  constructor(private router : Router, public country :CountryService) { }

  @Input() countryType :string|undefined 
  @Input() countryName :Date|undefined
  @Input() countryImage :string|undefined 
  @Input() countryDescrption :string|undefined 
  ngOnInit(): void {
  }
  goToProfile(){
    this.country.selectrdCountry={
      countryType:this.countryType,
      countryName:this.countryName,
      countryImage:this.countryImage,
      countryDescrption:this.countryDescrption
    }
    this.router.navigate(['client/country-profile'])
  }
}
