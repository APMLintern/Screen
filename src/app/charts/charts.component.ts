import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
  }
  gotoalltable(){
    this.router.navigate(['./alltable']); 
  }
}
