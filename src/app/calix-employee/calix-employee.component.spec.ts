import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalixEmployeeComponent } from './calix-employee.component';

describe('CalixEmployeeComponent', () => {
  let component: CalixEmployeeComponent;
  let fixture: ComponentFixture<CalixEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalixEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalixEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
