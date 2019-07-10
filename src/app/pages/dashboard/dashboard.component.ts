import { Component, OnInit } from '@angular/core';
import { DummyClass } from 'src/app/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let obj = new DummyClass({ prop1 : 'test', prop2: 1 });
    console.log(obj);
  }

}
