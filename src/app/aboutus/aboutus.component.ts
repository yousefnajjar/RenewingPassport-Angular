import { Component, OnInit } from '@angular/core';
import { AboutService } from '../Services/about.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(public about: AboutService ) { }
  
  
  
 
  ngOnInit(): void {
    this.about.get()
  }


}
