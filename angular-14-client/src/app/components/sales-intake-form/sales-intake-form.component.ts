import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SalesIntakeModel } from 'src/app/models/salesintake.model';
import { SalesIntakeService } from '../../services/salesintake.service';

@Component({
  selector: 'app-sales-intake-form',
  templateUrl: './sales-intake-form.component.html',
  styleUrls: ['./sales-intake-form.component.css']
})
export class SalesIntakeFormComponent implements OnInit {
  public salesForm = this.formBuilder.group({
    sanctionloadinkw_fc:[""],
    phaseatpremises_fc:[""]
  })
  constructor(private salesIntakeService:SalesIntakeService,private formBuilder:FormBuilder) { 

  }
  
  submitted:boolean=false;

  // salesIntakeModel:SalesIntakeModel = {
  //   sanctionloadinkw:"",
  //   phaseatprememesis:""
  // }
  
  ngOnInit(): void {
  }
  
  submit() {
    const data = {
      sanctionloadinkw:this.salesForm.value.sanctionloadinkw_fc,
      phaseatpremesis:this.salesForm.value.phaseatpremises_fc
    }
    this.salesIntakeService.exportSalesIntake(data)
    .subscribe({
      next: (res) => {
        this.submitted = true;
      },
      error: (e) => {
        console.log('Error occured on sumbit()',e);
      }
    })
  }
}
