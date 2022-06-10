import { Component, Input, OnInit } from '@angular/core';
import { TestimonialService } from '../Services/testimonial.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  
  constructor(public testmonial:TestimonialService) { }

  
  ngOnInit(): void {
    this.testmonial.getAllTestimonial()
  }

}