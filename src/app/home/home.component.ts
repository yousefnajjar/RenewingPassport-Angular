import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementsService } from '../Services/announcements.service';
import { DatePipe } from '@angular/common';
import { TestimonialService } from '../Services/testimonial.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GalleryService } from '../Services/gallery.service';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from '../Services/country.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public announcements: AnnouncementsService, private router: Router,
    public testmonial: TestimonialService, private dialog: MatDialog ,public gallery :GalleryService,
     private toastr: ToastrService, public country:CountryService ) { }
  @ViewChild('callCreateTestimonial') callCreateTestimonialDialog!: TemplateRef<any>
  
  CreateTestimonialForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    imagepath: new FormControl(),
    feedback: new FormControl('', Validators.required),
  })
  slidername = ['We Renew Passport', 'We Make Passport', 'We Help You!!',]
  Processfaster = 'Process Faster'
  info = "We help you to renew your passport while you are at home"

  announcementdate: Date = new Date()
  time: any = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 72);
  datepipe: DatePipe = new DatePipe('en-US')
  formattedDate: any
  ngOnInit(): void {
    this.formattedDate = this.datepipe.transform(this.time, 'YYYY-MM-dd HH:mm:ss')
    this.announcements.getAllAnnouncement()
    
    this.testmonial.getAllTestimonial()
    this.gallery.get()
    this.testmonial.get()
   
    if(localStorage.getItem('token') != null){
      this.country.getuser()
      setTimeout(() => {
        this.country.getByType()
      }, 2000);
      
    }
    else{
      this.country.get()
    }
   
    
  }

  goToAllAnnouncements() {
    this.router.navigate(['client/announcements'])

  }
  goToAllcountry(){

    this.router.navigate(['client/countrys'])
  }
  openTestimonialDialog() {
    if (localStorage.getItem('token') != null) {
      this.dialog.open(this.callCreateTestimonialDialog)  
    }
    else{
      this.toastr.warning('Please Login to continue')
    }
  }

  uploadImage(file: any) {
    if (file.length === 0)
      return;
    const uploadfile = <File>file[0];
    const formData = new FormData();
    formData.append('file', uploadfile, uploadfile.name);
    this.testmonial.uploadAttachment(formData);
  }
  saveTestimonial() {
    this.testmonial.createTestimmonial(this.CreateTestimonialForm.value);
  }


  isLogin(){
    if (localStorage.getItem('token') != null) {
      return true;
    }
    else{
      return false;
    }
  }
}
