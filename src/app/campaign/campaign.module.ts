import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { NewcampaignComponent } from './newcampaign/newcampaign.component';
import { CampaigndatatableComponent } from './campaigndatatable/campaigndatatable.component';
import { DataTablesModule } from 'angular-datatables';
import { DeployComponent } from './newcampaign/deploy/deploy.component';
import { ChannelComponent } from './newcampaign/channel/channel.component';
import { ResultComponent } from './newcampaign/result/result.component';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DefineComponent } from './newcampaign/define/define.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import { NgSelectModule } from '@ng-select/ng-select';


// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    CampaignComponent,
    NewcampaignComponent,
    CampaigndatatableComponent,
    DeployComponent,
    ChannelComponent,
    ResultComponent,
    DefineComponent,
  
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    DataTablesModule,
    NgbPaginationModule,
     NgbAlertModule,
     NgbModule,
     ReactiveFormsModule,
     FormsModule,
     CalendarModule,
     NgSelectModule,
     
    // BrowserAnimationsModule,
    
  ]
})
export class CampaignModule { }
