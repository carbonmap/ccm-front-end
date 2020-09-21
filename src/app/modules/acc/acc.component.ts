import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.scss']
})
export class AccComponent implements OnInit {

  title = 'Colleges';
  entites = ['Kings', 'Homerton', 'Girton', 'Trinity'];
  myEntity = this.entites[0]; 
  i
  ngOnInit(): void {
  }

}
