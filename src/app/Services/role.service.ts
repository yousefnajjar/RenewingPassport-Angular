import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  url:any = 'http://localhost:56422/api/'

   roleData:any=[]
  get() {
    this.spinner.show();
    this.http.get(this.url+'Pr_role').subscribe((result) => {
      this.roleData = result;
      this.spinner.hide()
      //this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    }
    )
  }
  // create(body:any){
  //   body.website_Id=4;
  //   this.spinner.show();
  //   this.http.post('https://localhost:44317/api/Pr_role/CreateRole', body).subscribe((res) => {
  //     this.spinner.hide();
  //     this.toastr.success('Created Successfully')
     
  //   }, err => {
  //     this.spinner.hide();
  //     this.toastr.error(err.message, err.status)
  //   }) 
  // }

  delete(id :number){
    this.http.delete(this.url+'Pr_role/DeleteRole/'+id+'/').subscribe((res)=>{
      this.toastr.success('Deleted Successfully :) ')
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    },err=>{
      this.toastr.error(err.message);
    })
   
  }

  update(body:any){
    this.spinner.show()
     this.http.put(this.url+'Pr_role/UpdatRole',body).subscribe((res)=>
     {
       this.spinner.hide()
       this.toastr.success("Updated Successfully :)")
     },err=>{
       this.spinner.hide()
       this.toastr.error(err.massege,err.status)
     })

  }
}
