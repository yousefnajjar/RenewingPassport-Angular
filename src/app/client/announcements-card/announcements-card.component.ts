import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementsService } from 'src/app/Services/announcements.service';

@Component({
  selector: 'app-announcements-card',
  templateUrl: './announcements-card.component.html',
  styleUrls: ['./announcements-card.component.css']
})
export class AnnouncementsCardComponent implements OnInit {

  @Input() text :string|undefined 
  @Input() publisheddate :Date|undefined
  @Input() subject :string|undefined 
  @Input() category :string|undefined 
  constructor(  private router : Router,public announcements:AnnouncementsService ) { }

  ngOnInit(): void {
  }
  goToProfile(){
    this.announcements.selectrdAnnouncement={
      text:this.text,
      subject:this.subject,
      publisheddate:this.publisheddate,
      category:this.category
    }
    this.router.navigate(['client/announcements-profile'])
  }
  

}
