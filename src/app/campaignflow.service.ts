import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignflowService {


  constructor() { }

  camName: any = ''
  // ch:any=true
  // 
  // 
  refreshtable:any
  refresh:any
  er:any
  oneToThree:any
  ccc:any
  ccc1:any
  apiSegName:any
  apiSegType:any
  apiSegId:any
  // 
  repeatCheck:any
  alreadyCampaign:any;
  // 
  Acq:any
  //
  // check empty
  checkAllEmpty:any
   allSelect:any=false
  checkAll:any
  saveOrRecommend:any
  budgets: any = ""
  per: any = ""
  Recommended: any;
  segmentValues: any = ""
  segId:any
  patchChennalApi:any=null;
  sDay: any
  endDay: any
  editpatchApi=new Subject()
  editCampaignId:any=null
  one: any
  camNameError: any
  tabs = 'define'
  Nempty:any=null
  firstPatch:any;


  subCampaignId:any=new Subject()
  
  segName: any;
  mobile: any = new Subject();
  nonmobile: any = new Subject()
  nonmob: any;
  mob: any
  sir: any = ''
  campaignId: any = null
  segType:any
  segNames:any
  payLoad: any = {}
  pay:any=new Subject()
  segmentName: any
  marketingChannel: any = []
  recommended = new Subject();
  saved = new Subject();
  channelapi = new Subject();
  TorF = null
  redeployId: any =new Subject()
  redeployErrorMes: any;
  resultSegName: any


  StartDate: any;
  EndDate: any;
  ConversionRate: any;
  Budget: any


}
