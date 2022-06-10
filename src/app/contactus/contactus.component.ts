import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactService } from '../Services/contact.service';
import { ProfileService } from '../Services/profile.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  contactForm :FormGroup=new FormGroup({
  name : new FormControl('',[Validators.required]), 
  email : new FormControl('',[Validators.required,Validators.email]),
  phone_No : new FormControl(''),
  massege : new FormControl('',[Validators.required])
   })
   
  constructor(private spinner: NgxSpinnerService , public contact :ContactService, public profile: ProfileService) { }

  ngOnInit(): void {    
   this.profile.get()
      
}

  submit() {
   
    this.contact.create(this.contactForm.value)

  }

}
