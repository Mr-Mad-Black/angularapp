import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule} from'@angular/common/http';
import { CalixEmployeeComponent } from './calix-employee/calix-employee.component';
import { CalixfrontComponent } from './calixfront/calixfront.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import { HighchartsComponent } from './highcharts/highcharts.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalixEmployeeComponent,
    CalixfrontComponent,
    HighchartsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CalendarModule,
    BrowserAnimationsModule ,
    HighchartsChartModule
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
