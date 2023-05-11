import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { NewcampaignComponent } from './newcampaign/newcampaign.component';
import { CampaigndatatableComponent } from './campaigndatatable/campaigndatatable.component';

const routes: Routes = [{ path:'', component: CampaignComponent ,children:[{path:"campaigndatatable",component:CampaigndatatableComponent},{path:"newcampaign",component:NewcampaignComponent}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
