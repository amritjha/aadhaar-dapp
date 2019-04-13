import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContractsService} from '../services/contracts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  @ViewChild('addRecordsForm') addRecordsForm: NgForm;

  ret_val:any = "";

  constructor(public cs : ContractsService) { }

  ngOnInit() { }

  public processIndex(i:number) {
    if( i < 10) 
      return "0" + i; 
    else 
      return i;
  }

  public async addRecords() {
    
    let nodeaddr:string = this.addRecordsForm.value.nodeaddr;
    let name:string = this.addRecordsForm.value.fullName.firstName + " " + this.addRecordsForm.value.fullName.lastName;
    let dob:string = this.addRecordsForm.value.dob.date + this.addRecordsForm.value.dob.month + this.addRecordsForm.value.dob.year;
    let gender:string = this.addRecordsForm.value.gender;
    let pin:string = this.addRecordsForm.value.place;
    let phone:string = this.addRecordsForm.value.contact.phone;
    let email:string = this.addRecordsForm.value.contact.email;
    let iris:string = this.addRecordsForm.value.biometrics.iris;
    let finger:string = this.addRecordsForm.value.biometrics.fingerprint;
    let face:string = this.addRecordsForm.value.biometrics.face;

    this.ret_val = await this.cs.addRecords(nodeaddr, name, dob, gender, pin, phone, email, iris, finger, face);
  }

}
