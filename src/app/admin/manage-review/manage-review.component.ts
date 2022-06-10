import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-manage-review',
  templateUrl: './manage-review.component.html',
  styleUrls: ['./manage-review.component.css']
})
export class ManageReviewComponent implements OnInit {

  constructor(public review :ReviewService ) { }

  ngOnInit(): void {
    this.review.get()
  }


  
}
