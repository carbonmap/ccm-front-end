import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-superuser',
  templateUrl: './superuser.component.html',
  styleUrls: ['./superuser.component.scss'],
  providers: [HttpClientModule]
})
export class SuperuserComponent implements OnInit {

  json;
  limbo; // name of object to use in html template for limbo files
  confirmed; // name of object to use in html template for confirmed files
  constructor(private http: HttpClient) { };

  ngOnInit(): void {
  };

  showfiles() {
    this.http.post("http://127.0.0.1:5000/showfiles", this.json)
      .subscribe((result) => {
        console.log("result", result);
        this.json = JSON.stringify(result);
        this.limbo = JSON.parse(this.json).limbo;
        this.confirmed = JSON.parse(this.json).confirmed;
      });
  };

  instance = this.showfiles(); // Create an instance of the showfiles function to run on page load

  file_name = { name: '' }

  move(file) {  // takes argument file, which is used in html button to select individual file

    this.file_name.name = file // sets the function argument == file_name json's name

    this.http.post("http://127.0.0.1:5000/movefile", this.file_name) // push request with file_name json
      .subscribe((result) => {
        console.log("The file has been moved", result);
        this.json = JSON.stringify(result);
        this.limbo = JSON.parse(this.json).limbo;
        this.confirmed = JSON.parse(this.json).confirmed;
      });
  }
}

