import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContractsService} from '../../services/contracts.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  @ViewChild('updatePersonalForm') updatePersonalForm: NgForm;

  ret_val: any;

  constructor(public cs : ContractsService) { }

  ngOnInit() { }

  public processIndex(i:number) {
    if( i < 10) 
      return "0" + i; 
    else 
      return i;
  }

  public async updatePersonalDetails() {
    let nodeaddr:string = this.updatePersonalForm.value.nodeaddr;
    let name:string = this.updatePersonalForm.value.fullName.firstName + " " + this.updatePersonalForm.value.fullName.lastName;
    let dob:string = this.updatePersonalForm.value.dob.date + this.updatePersonalForm.value.dob.month + this.updatePersonalForm.value.dob.year;
    let gender:string = this.updatePersonalForm.value.gender;
    
    this.ret_val = await this.cs.updatePersonalDetails(nodeaddr, name, dob, gender);
  }

}
