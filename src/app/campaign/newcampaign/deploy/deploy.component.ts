import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CampaignflowService } from 'src/app/campaignflow.service';
import { NewcampaignComponent } from '../newcampaign.component';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss']
})
export class DeployComponent {
  @Input() channel: any
  @ViewChild('content') content: any;
  @Output() nameDeploy: any = new EventEmitter()
  listToShow: any;
  closeResult: any;
  channelApi: any;
  putEvent: any = {}
  date: any = new Date()
  modalRef: any;
  constructor(public service: CampaignflowService, private modalService: NgbModal, public http: HttpClient, public compont: NewcampaignComponent) { }
  deployValue: any
  compareChannel: any

  allArr: any = ['HubSpot']
  event: any = {
    "campaignId": this.service.campaignId,
    "includeInChannel": "All",
    "marketingChannelId": "",
    "marketingChannelName": "",
    "orgId": localStorage.getItem('orgId'),
    "notificationName": "",
    "scheduleType": ""
  }
  ngOnInit() {
    console.log(this.service.campaignId);

    this.nameDeploy.emit('deploy')
    console.log("log" + "deploy");
    this.service.tabs = 'deploy'
    this.putEvent = this.service.payLoad;
    this.channelApi = this.channel;
    console.log(this.channelApi);
    console.log(this.service.campaignId);
    this.deployValue = this.service.segName
    this.listToShow = this.service.marketingChannel
    this.compareChannel = this.service.marketingChannel
    console.log(this.compareChannel);
    console.log(this.listToShow);
    this.CsvDownload()

  }
  download: any = true
  allCont = ["Hubspot", "ConstantContact", "Mailchimp", "Facebook"]

  CsvDownload() {
    this.allCont.forEach((element: any) => {
      if (!this.listToShow.includes(element)) {
        this.download = false


      }

    });

  }




  open() {
    this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' })


  }
  close() {
    this.modalRef.close();
  }
  save() {

    this.compont.one = true;
    this.compont.two = true;
    this.compont.three = true;
    setTimeout(() => {
      this.close()
    }, 300)

    this.compont.active = 4
    let mm = this.compareChannel.map((x: any) => { return x })
    console.log(mm);


    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append('X-Calix-AccessToken', `${localStorage.getItem('access_token')}`);
    headers = headers.append("X-Calix-ClientID", "kK1cJ0mRp7iSmTFt3vAGO44vobsu36op")
    console.log(this.channelApi);
    let allCompleted = 0;
    this.channelApi.filter((e:any)=> mm.includes(e.marketingChannel)).forEach((e: any, i: any, arr: any) => {
      console.log(e.marketingChannel[0]);
        this.event.marketingChannelId = e.marketingChannelId
        this.event.marketingChannelName = e.marketingChannel
        this.http.post(`https://stage.api.calix.ai/v1/cmc-channel/channel`, this.event, { headers }).subscribe((val: any) => {
          allCompleted++;
          if (allCompleted === arr.length) {
            this.getApi();
          }
        }, (err: any) => {
          console.log(err.error);
          console.log(e.marketingChannelId);
          allCompleted++;
          if (allCompleted === arr.length) {
            this.getApi();
          }

          this.service.redeployErrorMes = err.erroe
          this.service.redeployId.next(e.marketingChannel)
          console.log(this.service.redeployId);
        })

      
    })


  }
  getApi() {
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append('X-Calix-AccessToken', `${localStorage.getItem('access_token')}`);
    headers = headers.append("X-Calix-ClientID", "kK1cJ0mRp7iSmTFt3vAGO44vobsu36op")
    this.event = {
      application: null,
      budget: this.service.budgets,
      campaignId: this.service.campaignId,
      campaignType: null,
      // channels:[{}],
      conversionResult: null,
      conversionTarget: 0,
      created: moment(this.date).format('YYYY-MM-DD'),
      csvDownloadOnly: this.download,
      endDate: moment(this.service.endDay).format('YYYY-MM-DD'),

      eventType: null,
      location: "",
      name: this.service.camName,
      notificationSent: 0,
      orgId: Number(localStorage.getItem('orgId')),
      propensity: "",
      region: "",
      repeatPeriod: null,
      segmentCategory: this.service.saveOrRecommend,
      segmentClass: "Subscriber",
      segmentExecutableSize: 0,
      segmentId: this.service.segId,
      segmentMobileAppSize: 0,
      segmentName: this.service.segNames,
      segmentSize: 0,
      segmentType: this.service.segType,
      service: "",
      snapshotCreated: false,
      startDate: moment(this.service.sDay).format('YYYY-MM-DD'),
      status: "In-Progress",
      system: null,
      threshold: null,
      zipPlusFour: null,
      zipcode: null
    }

    this.http.get(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign/${this.service.campaignId}`, { headers }).subscribe()

    this.http.put(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign`, this.event, { headers }).subscribe(() => {

    })
    this.service.one = true



    this.http.get(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign/${this.service.campaignId}`,{headers}).subscribe()

    this.http.get(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign/${this.service.campaignId}`,{headers}).subscribe()
    this.http.get(`https://stage.api.calix.ai/v1/cmc-campaigns/dailyTotals/revenue/org?months=3`, { headers }).subscribe()
    this.http.get(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign/${this.service.campaignId}`, { headers }).subscribe()
    this.http.get(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign/${this.service.campaignId}?months=3`, { headers }).subscribe()
    this.http.get(`https://stage.api.calix.ai/v1/cmc-channel/channel/${this.service.campaignId}`,{headers}).subscribe()
    this.http.get(`https://stage.api.calix.ai/v1/cmc-channel/channel/${this.service.campaignId}`, { headers }).subscribe()



  }
}
