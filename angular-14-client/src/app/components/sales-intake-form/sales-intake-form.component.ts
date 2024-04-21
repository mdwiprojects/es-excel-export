import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sales-intake-form',
  templateUrl: './sales-intake-form.component.html',
  styleUrls: ['./sales-intake-form.component.css']
})
export class SalesIntakeFormComponent implements OnInit {
  public salesForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  submit() {}
}
