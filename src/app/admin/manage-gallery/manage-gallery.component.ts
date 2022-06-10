import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GalleryService } from 'src/app/Services/gallery.service';

@Component({
  selector: 'app-manage-gallery',
  templateUrl: './manage-gallery.component.html',
  styleUrls: ['./manage-gallery.component.css']
})
export class ManageGalleryComponent implements OnInit {

  constructor(public gallery: GalleryService, private diolog: MatDialog) { }
  @ViewChild('callCreate') callCreateDialog!: TemplateRef<any>
  @ViewChild('callDelete') callDeleteDialog!: TemplateRef<any>
  @ViewChild('callUpdate') callUpdateDialog!: TemplateRef<any>

  CreateForm: FormGroup = new FormGroup({
    image: new FormControl('', Validators.required),
  })
  UpdateForm: FormGroup = new FormGroup({
    gallery_Id: new FormControl(),
    image: new FormControl(),
  })
  ngOnInit(): void {
    this.gallery.get()
  }

  openCreatedialog() {
    this.diolog.open(this.callCreateDialog)
  }

  gal: any = {}
  openUpdatedialog(gallery_Id1: any, image1: any) {

    this.gal = {
      gallery_Id: gallery_Id1,
      image: image1,

    }
    this.UpdateForm.controls['gallery_Id'].setValue(gallery_Id1)
    this.UpdateForm.controls['image'].setValue(image1)

    this.diolog.open(this.callUpdateDialog)

  }
  openDeletedialog(id: any) {
    const dialogRef = this.diolog.open(this.callDeleteDialog)
    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        if (res == "yes") {
          this.gallery.delete(id);
          setTimeout(() => {
            window.location.reload()
          }, 2000);        }

        else if (res == "no")
          console.log("Thank you ");

      }
    })

  }

  save() {
    this.gallery.create(this.CreateForm.value)
    setTimeout(() => {
      window.location.reload()
    }, 2000);  }

  update() {
    this.gallery.update(this.UpdateForm.value)
    setTimeout(() => {
      window.location.reload()
    }, 2000); 
   }


  uploadImage(file: any) {
    if (file.length === 0)
      return;
    const uploadfile = <File>file[0];
    const formData = new FormData();
    formData.append('file', uploadfile, uploadfile.name);
    this.gallery.uploadAttachment(formData);
  }
}
