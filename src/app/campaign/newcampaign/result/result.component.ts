import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CampaignflowService } from 'src/app/campaignflow.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import { catchError, forkJoin, of, pipe } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() channel: any
  @ViewChild('content') content: any;
  
  Segment: any;
  StartDate: any;
  EndDate: any;
  ConversionRate: any;
  Budget: any
  channelValue: any;
  deployId: any;
  resultArray: any;
  modalRef: any;
  xvalue: any;
  reDeployName:any
   arr:any=[]
  compareChannel: any;
  allFunctions:any

  constructor(private modalService: NgbModal, public service: CampaignflowService,public http :HttpClient) { }
  ngOnInit() {
    this.service.refresh=true
    this.compareChannel=this.service.marketingChannel
    console.log(this.compareChannel);
    
    console.log(this.channel);
    this.channelValue = this.channel

    console.log(this.service.segName);
    this.Segment = this.service.segName;
    this.EndDate = moment(this.service.endDay).format('YYYY-MM-DD')
    this.StartDate = moment(this.service.sDay).format('YYYY-MM-DD')
    this.Budget = this.service.budgets
    this.ConversionRate = this.service.per
    console.log(this.service.redeployId);
    this.service.redeployId.subscribe((val:any) =>{
      this.arr.push(val)
    })
    setTimeout(()=>{
      console.log(this.arr);
    },5000)

    
   
    // this.deployId = this.service.redeployId
    console.log(this.channelValue);
    this.func()

  }
  
  func(){
    if( this.compareChannel.includes("Facebook")){
      console.log("sceen tha");
      
    }
    else{
      console.log("no");
      
    }

  }
  event:any={"campaignId":this.service.campaignId,
  "includeInChannel":"All",
  "marketingChannelId":"",
  "marketingChannelName":"",
  "orgId":localStorage.getItem('orgId'),
  "notificationName":"",
  "scheduleType":""}

  definevalue(event: any) {
    this.StartDate = event.datestart;

  }
  open(event:any) {
    if(event=='Facebook'){
      this.reDeployName='Facebook'
      this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
    }
    if(event=='Mailchimp'){
      this.reDeployName='Mailchimp'
      this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
    }
    if(event=='Hubspot'){
      this.reDeployName='Hubspot'
      this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
    }
    if(event=='ConstantContact'){
      this.reDeployName='ConstantContact'
      this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
    }
    
		
	
	}

	close() {
		this.modalRef.close();
	}
  
  reDeployAll(){
   
    let headers:HttpHeaders=new HttpHeaders()
    headers=headers.append('X-Calix-AccessToken',`${localStorage.getItem('access_token')}`);
    headers=headers.append("X-Calix-ClientID","kK1cJ0mRp7iSmTFt3vAGO44vobsu36op")
  this.channelValue.reduce((a:any,e:any) =>{
    console.log(e.marketingChannel[0]);
    console.log(e.marketingChannel);
    
    
    if(e.marketingChannel.includes(this.reDeployName)){
      this.event.marketingChannelId=e.marketingChannelId
      this.event.marketingChannelName=e.marketingChannel      
       this.http.put(`https://stage.api.calix.ai/v1/cmc-channel/channel`,this.event,{headers}).subscribe((val:any)=>{
        console.log(this.arr.indexOf(this.reDeployName));
        let Inde=this.arr.findIndex((x: any) => { return x ==this.reDeployName});
        this.arr.splice(Inde, 1)
      })
  }
  })
  setTimeout(() => {
    this.close()
  }, 500);

  }
}
