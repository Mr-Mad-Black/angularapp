import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { CampaignflowService } from 'src/app/campaignflow.service';
import { DefineComponent } from './define/define.component';
import { event } from 'jquery';
import { viewport } from '@popperjs/core';
import { DeployComponent } from './deploy/deploy.component';
import { ChannelComponent } from './channel/channel.component';

@Component({
  selector: 'app-newcampaign',
  templateUrl: './newcampaign.component.html',
  styleUrls: ['./newcampaign.component.scss']
})
export class NewcampaignComponent {
  @ViewChild('Define') Define!: DefineComponent
  @ViewChild('channelView') channelView!: ChannelComponent
  @ViewChild('Deploy') Deploy!: DeployComponent

  one = false
  two = true;
  three = true;
  four = true
  firstName: any
  apis: any;
  active_tab = ""
  channel = 1
  isSelect:any
  segmentData: any = [];
  segmentData1:any=[]
  dummy: any = [];
  channalApi: any;
  editpatchApi: any;
  constructor(public http: HttpClient, public service: CampaignflowService) { }
  active = 1;
  ngOnInit() {
    this.allApis();
    this.firstName = 'New Campaign'
    this.active_tab = 'define'
  } 
  ck(){
    this.active_tab = 'channel'
  }
  nameDefine(event: any) {
    this.active_tab = event
  }
  nameChennel(event: any) {
    this.active_tab = event
  }
  nameDeploy(event: any) {
    this.active_tab = event
  }
  NM(event: any) {
    this.firstName = event
  }
  allApis() {
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append('X-Calix-AccessToken', `${localStorage.getItem('access_token')}`);
    headers = headers.append("X-Calix-ClientID", "kK1cJ0mRp7iSmTFt3vAGO44vobsu36op");
    this.apis = [
      this.http.get(`https://stage.api.calix.ai/v1/cmc/segments/recommendedSegments?details=false&counts=false`, { headers }),
      this.http.get(`https://stage.api.calix.ai/v1/cmc/segments/savedSegments?details=false&counts=false`, { headers })]

    forkJoin((this.apis)).subscribe((val: any) => {
      this.service.Recommended = val[0]
      this.segmentData.push(...val[0]);
      this.segmentData1.push(...val[1]);
    })


    this.http.get('https://stage.api.calix.ai/v1/cmc-mchannel/marketingChannel', { headers }).subscribe((val: any) => {
      this.channalApi = val

    })
    if (this.service.editCampaignId !== null) {
      this.http.get(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign/${this.service.editCampaignId}`, { headers }).subscribe((val: any) => {
        this.firstName = val.name
        this.two = false
        this.service.campaignId = val.campaignId
        this.service.editpatchApi.next(val)

      })
      this.http.get(`https://stage.api.calix.ai/v1/cmc-channel/channel/${this.service.editCampaignId}`, { headers }).subscribe((val: any) => {
        console.log(val);
        this.two = false
        console.log(typeof(val));
        if(!val.length ){
        }
       else{
        this.service.patchChennalApi = val
       }
      })
    }

  }
 
  input: any = {
    'CampaignName': '',
    'Budget': '',
    'ConversionTarget': '',
    'value': '',
    'segment': '',
    'datestart': '',
    'dateend': ''
  }
  definevalue(ev: any) {
    this.input.CampaignName = ev.cName;
  }
  fun1() {
    this.active = 1
  }
  fun2() {
    
    this.Define.fullValidators()
    if( this.Define.flow1 && this.Define.flow2 && this.Define.flow3 && this.Define.flow4 && this.Define.Nxt){
    this.Define.save((success:boolean)=>{
      if(success && this.Define.Nxt){
        this.active=2
      }
      else{
        this.active=1

      }
    })
  }
  }
  fun3() {
    this.active = 3
    this.channelView.put()
  }
  check(event: any) {
    this.three = event
  }
  select(event:any){
    this.isSelect=event
  }
  saveCamp1(){
    this.channelView.put()
  }
  saveCamp(active_tab:any){
    if(active_tab=='define'){
      // used^
      this.Define?.fullValidators()
      if( this.Define.flow1 && this.Define.flow2 && this.Define.flow3 && this.Define.flow4 && this.Define.Nxt){
    
      
      this.Define.save((success:boolean)=>{
        if(success && this.Define.Nxt){
          // this.active=2
        }
      })
      }}

  }
  next(active_tab: any) {

    if(active_tab=='define'){
      // used^
      this.Define?.fullValidators()
      if( this.Define.flow1 && this.Define.flow2 && this.Define.flow3 && this.Define.flow4 && this.Define.Nxt){
    
      
      this.Define.save((success:boolean)=>{
        if(success && this.Define.Nxt){
          this.active=2
        }
      })
    }
      
    
   

      }
     
    if(active_tab=='channel'){
      this.channelView.put()
      this.channelView.channelGet()
     if(this.channelView.Nxt==true){
      this.active+=1
     }
    }
    if(active_tab=='deploy'){
    this.Deploy.open()
    }
   

    // alert("tab"+active_tab)
    // if (active_tab == 'define' ) {
    //   this.active_tab = 'channel'
     
    //   this.Define.save()
    //   this.active = 2
    //   this.two = false
    // }
    // if (active_tab == 'channel') {

    //   if (this.service.marketingChannel.length > 0) {
    //     this.channelView.put()
    //     this.active_tab = 'deploy'
    //     this.active = 3
    //     this.three = false
    //   }
    // }
    // if (active_tab == 'deploy') {
    //   this.Deploy.open()
    // }
  }

  previous(active_tab: any) {
    console.log("pre" + active_tab);


    if (active_tab == 'channel') {
      this.active = this.active - 1
      this.active_tab = 'define'
    }
    if (active_tab == 'deploy') {
      this.active = this.active - 1
      this.active_tab = 'channel'
    }
    if (active_tab == 'define') {

      this.active = this.active - 1
    }

  }



}
