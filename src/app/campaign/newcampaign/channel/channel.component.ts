import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { findIndex } from 'rxjs';
import { CampaignflowService } from 'src/app/campaignflow.service';
import { NewcampaignComponent } from '../newcampaign.component';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {
  @Input() channel: any
  @Output() checkB: any = new EventEmitter()
  @Output() select: any = new EventEmitter()



  abc = false;
  mC: any = [];
  date = new Date()
  arr: any = ["one", "two"]
  vv: any;
  masterSelected: any;
  ConstantContact: any;
  Mailchimp: any;
  Hubspot: any;
  all = false
  errorMessage: any
  check: any;
  channelPathch: any;
  patchChannel: any;
  checked:any;

// next
Nxt:any
  getCampaignId: any;


  constructor(private http: HttpClient, public service: CampaignflowService, public component: NewcampaignComponent) { }
  // check:any=new FormGroup({
  //   cb:new FormControl(false)

  // })

  TorF = false
  RRR = true
  list: any = [];
  nonmobilevalue: any
  mobile: any
  nonmobile: any;
  event = {};
  facebook = '';
  disabled = true
  active_tab = 'channel'
  ab = true
  Acq:any=''
  abcd: any
  csvResult:any=false

  checkedList: any = []
  @Input() campaignDetails: any;
  @Output() nameChennel = new EventEmitter()

  ngOnInit() {
    this.Acq=this.service.Acq
    console.log(this.service.patchChennalApi);
if(this.service.repeatCheck==true){
  this.checked=true
}

    this.service.oneToThree=false

    
   
 if (this.service.patchChennalApi != null) {

  this.getCampaignId= this.service.editCampaignId
      
      this.channelPathch = this.service.patchChennalApi
      console.log(this.channelPathch);

      this.patchChannel = this.channelPathch.map((val: any) => {
        console.log(val.marketingChannelName);
        return val.marketingChannelName


      })
    }
    else{
    
      console.log(this.service.campaignId);
      setTimeout(() => {
        this.getCampaignId=this.service.campaignId
      }, 1000);
      
    }
    this.nameChennel.emit('channel')
    console.log(this.patchChannel);






    this.masterSelected = false
    
    
    
    

    this.service.tabs = 'channel'
  
      console.log(this.service.nonmob);
      
    
    this.masterSelected = false;
    // this.event=this.service.payLoad;
    // this.service.pay.subscribe((val:any) =>{
    //   console.log(val);

    //   this.event=val
    // })
   
      this.service.nonmobile.subscribe((value: any) => {
        console.log(value);
        
        this.nonmobile = value;
        this.service.nonmob = value
      
      console.log('nonmon'+value);
      })
      this.service.mobile.subscribe((value: any) => {
        this.mobile = value
        this.service.mob = value
        console.log('mob'+value);
      })
      
   
    this.nonmobile = this.service.nonmob
    this.mobile = this.service.mob
     
    
    




    this.list = this.channel;

    this.toDeploy()
    this.mobile=this.service.ccc
    this.nonmobile=this.service.ccc1
    if(this.service.allSelect==true){
      this.masterSelected = true;

    }
    if(this.Acq=='noMobileNot'){
      let dupList=[...this.list]
    let Inde = dupList.findIndex((x: any) => { return x.marketingChannel  == 'Mobile Notification' });
     console.log(Inde);
      let shorter=dupList.splice(Inde, 1)
      console.log(shorter);
      
      this.list=dupList
    }
    else{
      this.list=this.channel
    }
      
      

    // })
   if(this.service.checkAllEmpty==true){
    this.service.marketingChannel=[]
    }
   

  }
  downloadCSV(event:any){
  if(event.checked==true){
    alert('get up')
    this.checked=true
   
    this.checkB.emit(false)
     this.service.marketingChannel.push('download Csv')
     this.service.repeatCheck=true
     this.csvResult=true
     if(this.service.marketingChannel.length==5){
      this.masterSelected=true
      this.service.allSelect=true
      
     }
     
    
  }

  if(event.checked==false){
    alert('fall')
    this.csvResult=false
    this.service.repeatCheck=false
    this.checked=false
    this.checkB.emit(true)
    this.masterSelected=false
    this.service.allSelect=false
    
     
      let Inde=this.service.marketingChannel.findIndex((x: any) => { return x == 'download Csv' });
      this.service.marketingChannel.splice(Inde, 1)
      
    
  }
  if(this.service.marketingChannel.length>0){
    this.select.emit(true)
  }
  else{
    this.select.emit(false)
  }
    
  }
  toDeploy() {
    console.log("toDeploy");
    // console.log(this.service.patchChennalApi.length);

    if (Array.isArray(this.service.patchChennalApi)) {
      this.component.three = false
      for (var i = 0; i < this.list.length; i++) {
        if (this.patchChannel.includes(this.list[i].marketingChannel))
          this.list[i].checked = true
        this.checkedList.push(this.list[i].marketingChannel);
        console.log(this.checkedList);
        this.service.marketingChannel = this.patchChannel

      }
    }
  }













  ch(event: any) {

    this.RRR = false
    console.log(event);

  }

  getCheckedItemList() {
    this.errorMessage = ''
    for (var i = 0; i < this.list.length; i++) {
if (this.list[i].marketingChannel == "Mobile Notification") {

  this.list[i].checked = false;
}
      if (this.list[i].checked)
        this.checkedList.push(this.list[i].marketingChannel);
        
    }
    
        
    let dup = [...new Set(this.checkedList)]
    this.service.marketingChannel = dup
  

  }
  selectsingle(event: any, item: any) {
    this.masterSelected = this.list.every((item:any) => {
      for (var i = 0; i < this.list.length; i++) {
        
        if (this.list[i].marketingChannel == "Mobile Notification") {
          this.list[i].checked = true;
          if(this.Acq!=='noMobileNot'){
               if(this.checked!=true){
                this.list[i].checked = false;
                
               }
          }
        }
        
      }
    
      return item.checked == true;
    })
    this.service.allSelect=this.masterSelected
    
    if (event.checked == true) {
    
      this.errorMessage = ''
      this.check = false
      this.checkB.emit(this.check)
      this.service.marketingChannel
      let gett = this.service.marketingChannel.filter((item: any, index: any, arr: any) => { return arr.indexOf(item) === index });
      this.service.marketingChannel = gett
    }
    if (event.checked == false) {
     
      let Inde = this.service.marketingChannel.findIndex((x: any) => { return x == item.marketingChannel });
      this.service.marketingChannel.splice(Inde, 1)
      if (this.service.marketingChannel.length == 0) {
        this.check = true
        this.checkB.emit(this.check)

      }

    }

    if (event.checked == true) {

      this.service.marketingChannel.push(item.marketingChannel)
    }
    if (event.checked == false) {
      if (item.marketingChannel == 'Facebook') {
        this.facebook = ''
      }
      if (item.marketingChannel == 'ConstantContact') {
        this.ConstantContact = ''
      }
      if (item.marketingChannel == 'Mailchimp') {
        this.Mailchimp = ''
      }
      if (item.marketingChannel == 'Hubspot') {
        this.Hubspot = ''
      }

    }
    if(this.service.marketingChannel.length>0){
      this.select.emit(true)
    }
    else{
      this.select.emit(false)
    }
  }
  selectall(event: any, item: any) {

    for (var i = 0; i < this.list.length; i++) {
      this.list[i].checked = this.masterSelected;
    }
    this.getCheckedItemList();

    if (event.checked == true) {
      
      this.service.allSelect=true
      this.check = false
      if(this.Acq!=='noMobileNot'){
      this.checked=true
      this.csvResult=true
      this.checkedList.push('download Csv')
      this.service.repeatCheck=true
      }
      this.checkB.emit(this.check)
      this.service.checkAll=true

      for (var i = 0; i < this.list.length; i++) {
        
        if (this.list[i].marketingChannel == "Mobile Notification") {
          this.list[i].checked = false;
        }
        else {

          this.list[i].checked = true;
        }
      }
      this.getCheckedItemList();
    }
    if (event.checked == false) { 
      
      this.service.allSelect=false
      this.service.checkAll=false   
    this.check = true
    this.checked=false
    if(this.Acq!=='noMobileNot'){
      this.checked=false
      this.csvResult=false
      
      this.service.repeatCheck=false
      }
      this.checkB.emit(this.check)
      for (var i = 0; i < this.list.length; i++) {
        this.list[i].checked = false;
      }
      this.checkedList = []
      this.service.marketingChannel = this.checkedList
      console.log(this.checkedList);

    }




    // this.selectsingle(,)
    if (event.checked == true) {

      this.facebook = 'Facebook';
      this.ConstantContact = 'ConstantContact'
      this.Mailchimp = 'Mailchimp'
      this.Hubspot = 'Hubspot'

    }
    if (event.checked == false) {
      // this.service.marketingChannel=[]
      this.facebook = ''
      this.ConstantContact = ''
      this.Mailchimp = ''
      this.Hubspot = ''
    }
    console.log(event.value);

    console.log(event.checked);
    if (event.checked == true) {
      this.vv = true


    }
    if(this.service.marketingChannel.length>0){
      this.select.emit(true)
    }
    else{
      this.select.emit(false)
    }
  }




  put() {
   
    this.event = {
      application: null,
      budget: this.service.budgets,
      campaignId: this.service.campaignId,
      campaignType: null,
      channels: null,
      conversionResult: null,
      conversionTarget: 12,
      created: moment(this.date).format('YYYY-MM-DD'),
      csvDownloadOnly:'',
      endDate: moment(this.service.endDay).format('YYYY-MM-DD'),
      eventType: null,
      location: "",
      name: this.service.camName,
      notificationSent: 0,
      orgId: Number(localStorage.getItem('orgId')),
      propensity: "",
      region: "",
      repeatPeriod: null,
      segmentCategory: "Recommended",
      segmentClass: "Subscriber",
      segmentId: this.service.segId,
      segmentMobileAppSize: 0,
      segmentName: this.service.segNames,
      segmentSize: 0,
      segmentType: this.service.segType,
      service: "",
      snapshotCreated: false,
      startDate: moment(this.service.sDay).format('YYYY-MM-DD'),
      status: "Draft",
      system: null,
      threshold: null,
      zipPlusFour: null,
      zipcode: null
    }
    console.log(this.service.payLoad);
    console.log(this.service.marketingChannel.length);
    

    if (this.service.marketingChannel.length == 0) {
      this.errorMessage = 'Please select at least one channel.'
    }
    else{
      this.Nxt=true
      Object.assign(this.event,{
        csvDownloadOnly:this.csvResult}  )
    // if(this.check.valid){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append('X-Calix-AccessToken', `${localStorage.getItem('access_token')}`);
    headers = headers.append("X-Calix-ClientID", "kK1cJ0mRp7iSmTFt3vAGO44vobsu36op")
    this.http.put(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign`, this.event, { headers }).subscribe()
  }
}
channelGet(){
  let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append('X-Calix-AccessToken', `${localStorage.getItem('access_token')}`);
    headers = headers.append("X-Calix-ClientID", "kK1cJ0mRp7iSmTFt3vAGO44vobsu36op")
  this.http.get(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign/${this.getCampaignId}`,{headers}).subscribe()
}
}
// }

