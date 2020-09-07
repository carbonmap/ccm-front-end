import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-addent',
  templateUrl: './addent.component.html',
  styleUrls: ['./addent.component.scss']
})
export class AddentComponent {
  public frmEnt: FormGroup;

  constructor(private fb: FormBuilder) {
    this.frmEnt = this.createEntForm();
  }

  createEntForm(): FormGroup {
    return this.fb.group(
      {
        human_name: [
          null,
          Validators.compose([Validators.required])
        ],
        org: [
          null,
          Validators.compose([Validators.required])
        ],
        ent: [
          null,
          Validators.compose([Validators.required])
        ],
        subent: [],
        id: [
          null,
          Validators.compose([Validators.required])
        ],
        location: [
          null,
          Validators.compose([Validators.required])
        ],
      }
    );
  }
  submit() {
  console.log(this.frmEnt.value)
  }
  ngOnInit() {
    this.frmEnt.valueChanges.subscribe(console.log)
  }
    
}
