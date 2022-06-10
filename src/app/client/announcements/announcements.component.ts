import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementsService } from 'src/app/Services/announcements.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  constructor(public announcements:AnnouncementsService,private router:Router) { }
  SearchForm :FormGroup =new FormGroup({
    subject:new FormControl(),
    category:new FormControl(),
  })

  
  ngOnInit(): void {
    
   this.announcements.getAllAnnouncement()
  }
  
  Search(){
    this.announcements.search(this.SearchForm.value)

 }
}
