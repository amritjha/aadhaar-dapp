import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContractsService} from '../../services/contracts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('updateContactForm') updateContactForm: NgForm;
  ret_val: any;

  constructor(public cs : ContractsService) { }

  ngOnInit() { }

  public async updateContactDetails() {
    let nodeaddr:string = this.updateContactForm.value.nodeaddr;
    let pin:string = this.updateContactForm.value.place;
    let phone:string = this.updateContactForm.value.contact.phone;
    let email:string = this.updateContactForm.value.contact.email;
    console.log(nodeaddr + " " + pin + " " + phone + " " + email);
    this.ret_val = await this.cs.updateContactDetails(nodeaddr, pin, email, phone);
  }

}
