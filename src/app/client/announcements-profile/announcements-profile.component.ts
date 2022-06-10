import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/Services/announcements.service';

@Component({
  selector: 'app-announcements-profile',
  templateUrl: './announcements-profile.component.html',
  styleUrls: ['./announcements-profile.component.css']
})
export class AnnouncementsProfileComponent implements OnInit {

  constructor(public announcements:AnnouncementsService ) { }
  
  ngOnInit(): void {
  }

}
