import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContractsService} from '../../services/contracts.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('updateContactForm') updateContactForm: NgForm;

  particularsUpdatedEvent = this.cs.aadhaarContract.particularsUpdated();

  constructor(public cs : ContractsService, public ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() { }

  public async updateContactDetails() {
    let nodeaddr:string = this.updateContactForm.value.nodeaddr;
    let pin:string = this.updateContactForm.value.place;
    let phone:string = this.updateContactForm.value.contact.phone;
    let email:string = this.updateContactForm.value.contact.email;
    console.log(nodeaddr + " " + pin + " " + phone + " " + email);
    let tx_hash = await this.cs.updateContactDetails(nodeaddr, pin, email, phone);

    this.particularsUpdatedEvent.watch((err, res) => {
      if(err) 
        console.log(err);
      else {
        let notification = "<strong>Successfully updated!!</strong> Node address: <strong>" + res.args.node_addr + "</strong>";
        this.ngFlashMessageService.showFlashMessage({
          messages: [notification], 
          dismissible: true, 
          timeout: 4000,
          type: 'success'
        });
      }
    });

  }

}
