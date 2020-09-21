import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-addent',
  templateUrl: './addent.component.html',
  styleUrls: ['./addent.component.scss']
})

export class AddentComponent implements OnInit {
  public frmEnt: FormGroup;
  public entList: FormArray;

  get entFormGroup() {
    return this.frmEnt.get('ents') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.frmEnt = this.fb.group({
      human_name: [null, Validators.compose([Validators.required])],
      org: [null, Validators.compose([Validators.required])],
      issubent: [null, Validators.compose([Validators.required])],
      ents: this.fb.array([this.createEnt()])
    });

    this.entList = this.frmEnt.get('ents') as FormArray;
  }

  createEnt(): FormGroup {
    return this.fb.group({
      checked: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      value: [null, Validators.compose([Validators.required])],
      loc: [null, Validators.compose([Validators.required])]
    });
  }

  addEnt() {
    this.entList.push(this.createEnt());
  }

  removeEnt(index) {
    this.entList.removeAt(index);
  };
  
  
 



  getEntsFormGroup(index): FormGroup {
    const formGroup = this.entList.controls[index] as FormGroup;
    return formGroup;
  }

  submit() {
    console.log(this.frmEnt.value);
  }
}
