import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {


   url:any = 'http://localhost:56422/api/'

  announcementsData: any = []
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  @Input() announcement_Id: number | undefined
  @Input() text: string | undefined
  @Input() publisheddate: string | undefined
  @Input() subject: string | undefined
  @Input() category: string | undefined
  @Input() website_Id: number | undefined
  
  selectrdAnnouncement: any = {}
  time: any = new Date((new Date()).valueOf());
  datepipe: DatePipe = new DatePipe('en-US')
  formattedDate: any


  
  getAllAnnouncement() {
    this.spinner.show();
    this.http.get(this.url+'Pr_Announcement/').subscribe((result) => {
      this.announcementsData = result;
      this.spinner.hide()
     // this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    }
    )
  }

  create(body: any) {
    body.website_Id=4;
    this.formattedDate = this.datepipe.transform(this.time, 'YYYY-MM-ddTHH:mm:ss')
    body.publisheddate=this.formattedDate
    this.spinner.show();
    this.http.post(this.url+'Pr_Announcement/', body).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success('Saved Successfully :) ')
     
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    }) 
   
  }

  delete(id :number){
    this.http.delete(this.url+'Pr_Announcement/delete/'+id).subscribe((res)=>{
      this.toastr.success('Deleted Successfully :) ')
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    },err=>{
      this.toastr.error(err.message);
    })
   
  }
 

  update(body:any){
    this.formattedDate = this.datepipe.transform(this.time, 'YYYY-MM-ddTHH:mm:ss')
    body.publisheddate=this.formattedDate
    body.website_Id=4
    this.http.put(this.url+'Pr_Announcement/UpdateAnnouncement/',body).subscribe((res)=>{
      this.toastr.success('Updated Successfully :) ')
    },err=>{
      this.toastr.error(err.message,err.status);
    }) }

    search(data:any){
      data.category=''
      this.http.post(this.url+'Pr_Announcement/Search/', data).subscribe((res)=>{
        this.announcementsData= res;
      }, err=>{
        this.toastr.error(err.status, err.message);
      })
    }
}
