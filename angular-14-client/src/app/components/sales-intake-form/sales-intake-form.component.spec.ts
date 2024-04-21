import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesIntakeFormComponent } from './sales-intake-form.component';

describe('SalesIntakeFormComponent', () => {
  let component: SalesIntakeFormComponent;
  let fixture: ComponentFixture<SalesIntakeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesIntakeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesIntakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
