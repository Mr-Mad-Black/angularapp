import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcampaignComponent } from './newcampaign.component';

describe('NewcampaignComponent', () => {
  let component: NewcampaignComponent;
  let fixture: ComponentFixture<NewcampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcampaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
