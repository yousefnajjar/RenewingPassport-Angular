import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userunauthoriz',
  templateUrl: './userunauthoriz.component.html',
  styleUrls: ['./userunauthoriz.component.css']
})
export class UserunauthorizComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigate(['home'])
   }
}

