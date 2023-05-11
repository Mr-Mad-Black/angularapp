import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaigndatatableComponent } from './campaigndatatable.component';

describe('CampaigndatatableComponent', () => {
  let component: CampaigndatatableComponent;
  let fixture: ComponentFixture<CampaigndatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaigndatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaigndatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
