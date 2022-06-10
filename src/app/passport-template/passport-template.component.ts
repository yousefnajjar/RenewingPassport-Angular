import { Component, OnInit } from '@angular/core';
import { PassportService } from '../Services/passport.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-passport-template',
  templateUrl: './passport-template.component.html',
  styleUrls: ['./passport-template.component.css']
})
export class PassportTemplateComponent implements OnInit {

  constructor(public passport: PassportService) { }

  data: any = {}
  id: any = {}
  fname: any
  middlename: any
  lname: any
  ngOnInit(): void {
    this.passport.getId()

    setTimeout(() => {
      this.passport.getPassportByUserId(this.passport.profileData.user_Id)
    }, 1000);

  }


  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Passport.pdf');
      
    });
  }


}
