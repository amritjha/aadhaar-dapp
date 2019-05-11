import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContractsService} from '../../services/contracts.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-biometrics',
  templateUrl: './biometrics.component.html',
  styleUrls: ['./biometrics.component.css']
})
export class BiometricsComponent implements OnInit {

  @ViewChild('updateBiometricsForm') updateBiometricsForm: NgForm;

  particularsUpdatedEvent = this.cs.aadhaarContract.particularsUpdated();

  constructor(public cs : ContractsService, public ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() { }

  public async updateBiometricsDetails() {
    let nodeaddr:string = this.updateBiometricsForm.value.nodeaddr;
    let iris:string = this.updateBiometricsForm.value.iris;
    let finger:string = this.updateBiometricsForm.value.fingerprint;
    let face:string = this.updateBiometricsForm.value.face;
    
    let tx_hash = await this.cs.updateBiometricDetails(nodeaddr, iris, finger, face);

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
