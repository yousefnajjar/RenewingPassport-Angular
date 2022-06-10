import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  galleryData:any=[];
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  url:any = 'http://localhost:56422/api/'



  display_Image:any
   get(){
     this.spinner.show()
     this.http.get(this.url+'Pr_Gallery/GetALLGallery/').subscribe((res)=>
     {
       this.galleryData=res;
       this.spinner.hide()
//       this.toastr.success("Data Retrived")
     },err=>{
       this.spinner.hide()
       this.toastr.error(err.massege,err.status)
     })
   }


   uploadAttachment(file:FormData){
    this.http.post(this.url+'Pr_Gallery/UploadImage/',file)
    .subscribe((res:any)=>{
      this.display_Image=res.image;      
    },err=>{
      this.toastr.error(err.status,err.message);
    })
  }

  update(body:any){
    body.website_Id=4
    body.image=this.display_Image
    this.spinner.show()
     this.http.put(this.url+'Pr_Gallery/UpdateGallery/',body).subscribe((res)=>
     {
       this.spinner.hide()
       this.toastr.success("Updated Successfully :)")
     },err=>{
       this.spinner.hide()
       this.toastr.error(err.massege,err.status)
     })

  }

  create(body:any){
    body.website_Id=4
    body.image=this.display_Image
    this.spinner.show()
     this.http.post(this.url+'Pr_Gallery/CreateGallery/',body).subscribe((res)=>
     {
       this.spinner.hide()
       this.toastr.success("Created Successfully :)")
     },err=>{
       this.spinner.hide()
       this.toastr.error(err.massege,err.status)
     })

  }

  delete(id: number) {
    this.http.delete(this.url+'Pr_Gallery/DeleteGallery/'+id+'/').subscribe((res) => {
      this.toastr.success('Deleted Successfully :) ')
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }, err => {
      this.toastr.error(err.message);
    })

  }
}
