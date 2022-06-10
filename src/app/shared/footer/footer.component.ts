import { Component, OnInit } from '@angular/core';
import { WebsiteService } from 'src/app/Services/website.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor( public website:WebsiteService) { }
  mission="Many people find it very difficult when their passport expires, so this site is designed to provide the easiest and best ways to renew their passport online.";
  
  ngOnInit(): void {
    this.website.get()
  }

}
