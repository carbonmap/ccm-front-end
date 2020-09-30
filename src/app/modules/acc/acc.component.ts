import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.scss']
})
export class AccComponent implements OnInit {
  data  = [ 

    {
        name: "King's College, Cambridge",
        id: "uk.ac.cam.kings",
        joined: 1234568,
        latest_data: 1234568,
        parent_entity: null,
        properties: [{ 
           "Year Established": 1350,
           "Number of Students": 1500
        }]
    },
    {
        name: "King's College Gardens",
        id: "uk.ac.cam.kings.gardens",
        joined: "1234568",
        latest_data: "1234568",
        parent_entity: "uk.ac.cam.kings",
        properties: [{
           "Year Established": 1350,
           "Number of Employees": 8,
           "Number of Cars": 4
        }]
    },
    {
       name: "King's College Chapel",
       id: "uk.ac.cam.kings.cathedral",
       joined: 5623451,
       latest_data: 32435467,
       parent_entity: "uk.ac.cam.kings",
       properties: [{
          "Year Established": 1312, 
          "Number of Employees": 32
       }]
    }
  ];
  
  titles = ['Entity ID', 'Date Joined', 'Last Modified', 'Entity Name', 'Parent Entity']; 
  
  ngOnInit(): void { console.log()

  

  }
}
