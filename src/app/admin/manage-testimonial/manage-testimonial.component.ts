import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TestimonialService } from 'src/app/Services/testimonial.service';

@Component({
  selector: 'app-manage-testimonial',
  templateUrl: './manage-testimonial.component.html',
  styleUrls: ['./manage-testimonial.component.css']
})
export class ManageTestimonialComponent implements OnInit {

  constructor(public testimonial:TestimonialService,private http :HttpClient,private diolog :MatDialog) { }
  
  
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>
  ngOnInit(): void {
    this.testimonial.getAllTestimonial()
  }



  openDeleteDialog(id:any){
    const dialogRef=this.diolog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        {
          this.testimonial.delete(id);
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
        
        else if(res=="no")
        console.log("Thank you ");
        
      }
      
    })
    
  }

  approveTestimonial( body :any){
    this.testimonial.approve(body)
  }

}