import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalixfrontComponent } from './calixfront.component';

describe('CalixfrontComponent', () => {
  let component: CalixfrontComponent;
  let fixture: ComponentFixture<CalixfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalixfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalixfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
