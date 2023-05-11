import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CalixEmployeeComponent } from './calix-employee/calix-employee.component';
import { CalixfrontComponent } from './calixfront/calixfront.component';
import { HighchartsComponent } from './highcharts/highcharts.component';

const routes: Routes = [
  {path:"log" ,component:LoginComponent},
  {path:"calixEmoloyee" ,component:CalixEmployeeComponent},
  {path:"calixfront",component:CalixfrontComponent},
  {path:'',redirectTo:'log', pathMatch:'full'},
  { path: 'campaign', loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule) },
 {path:'highCharts', component:HighchartsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
