import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Header } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { Observable, forkJoin } from 'rxjs';
import * as moment from 'moment';
import { CampaignflowService } from 'src/app/campaignflow.service';
import { NewcampaignComponent } from '../newcampaign.component'

@Component({
  selector: 'app-define',
  templateUrl: './define.component.html',
  styleUrls: ['./define.component.scss']
})
export class DefineComponent {
  @Output() define=new EventEmitter();
  @Input() finalvalue:any
  @Input()twoApiValue:any;
  @Input()savedOne:any;
  @Output() nameDefine=new EventEmitter()
  @Output() NM=new EventEmitter()
 

 
  

  segmentData1:any=[]
  segmentData2:any=[]

    nonmobile:any
    mobile:any
  
  
  selectedAccount="All"
  allOptions=false
  

  @Input() campaignDetails:any;
 
  max:any;
  min:any;
  upSell=false
  apis: any;
  Select:any='All'
  dropDow: any;
  dropDowone: any;
  segmentId: any;
  valueseg: any;
  check: any="";
  segmentSize: any;
  segmentMobileAppSize: any;
  active_tab: any;
  currentDate = new Date();
  endDate=new Date();
  endD:any
  camNameError:any
  one="one"
  

segmentValues=""
recommend:any=[]
show:any=false;


// 
camNameErr1:any
// validate
camNameErr:any=null
segmentError:any=null
startDateError:any=null
endDateError:any=null
targetError:any;
sameCamapignNameError:any
// 
// API validate
flow1=false
flow2=false
flow3=false
flow4=false
// 
// ngModel
camName=""
budget=""
percentage=""
startDay:any=""
endDay:any=""
segNameValue:any=''
// 
// nxt
Nxt=false
  // 

//date
copyEndDate:any
// 
//type
segmentType:any
segmentName:any
  patchEdit: any;
  sday: any;
  eday: any;
  // 
  segType:any
  // 
  saveOrRecommend:any
  // 
  sameCamapignName=false
  postCampaign: any;


  constructor(private http:HttpClient, public service:CampaignflowService ,public component:NewcampaignComponent){
    
  }
  
  ngOnInit(){  
    if(this.service.refresh==true){
      location.reload();
    }
    this.service.refreshtable=true
    
    console.log(this.service.er);
    
  setTimeout(()=>{
    if(this.service.er==false){
      this.sameCamapignNameError ='same campaign name already exists'
 
     }

  },1000)
    
    this.recommend=this.service.Recommended
    if(this.service.firstPatch==true){
   
    this.camName=this.service.camName;
    this.budget=this.service.budgets
    this.percentage=this.service.per
    this.startDay=this.service.sDay
    this.endDay=this.service.endDay
    this.segNameValue=this.service.segmentValues
    this.camNameError=this.service.camNameError
    this.flow1=true
this.flow2=true
this.flow3=true
this.flow4=true

this.camNameErr=""
this.startDateError=""
this.endDateError=""
this.segmentError=""
this.Nxt=true 
let arr:any=[]
let rec=this.service.Recommended.map((value:any)=>{

  console.log(this.service.segmentValues);
  
  return arr.push(value.segmentName);
   })
   console.log(arr);
   if(arr.includes(this.service.segNames)){
    
     this.show=true
   }
    }
    console.log(this.service.alreadyCampaign);
  
    
    this.service.tabs='define'
    this.segmentData1=this.twoApiValue
   this.segmentData2= this.savedOne
    this.nameDefine.emit('define') 
    this.active_tab='define'

  //EDIT  
  this.service.oneToThree=true
    if(this.service.editCampaignId!== null){
      console.log(this.service.editCampaignId) 
      
      this.service.editpatchApi.subscribe((val:any) =>{
        console.log(val.segmentName);
        
        this.sday=new Date(val.startDate)
        this.eday=new Date(val.endDate)
        this.camName=val.name,
        this.budget=val.budget,
        this.percentage=val.conversionTarget
        this.startDay=this.sday
        this.endDay=this.eday
        this.segNameValue=val.segmentName
        this.service.segNames=val.segmentName
        // this.service.apiSegId=
        this.flow1=true
this.flow2=true
this.flow3=true
this.flow4=true
this.camNameErr=""
this.startDateError=""
this.endDateError=""
this.segmentError=""
this.Nxt=true
      
        this.twoApiValue.reduce((a:any,e:any)=>{
          if(e.segmentName.includes(val.segmentName)){
            this.service.apiSegId=e.segmentId
          } 
        });
        
        let Recommended: any[]=[]
        let rec= this.service.Recommended.map((val:any) =>{
         return Recommended.push(val.segmentName)
         })
        
           if(Recommended.includes(val.segmentName)){
             console.log('true');
             this.saveOrRecommend='Recommended'
             
             this.show=true
           }
           else{
             this.show=false
             this.saveOrRecommend='Saved'
           }
          
        let arr:any=[]
     this.service.Recommended.map((value:any)=>{
      console.log(value);
      
         return arr.push(value.segmentName);
        })
        if(arr.includes(val.segmentName)){
          this.show=true
        }
          
       })
      }
     
  }
  fullValidators(){
 
    if(this.camNameErr==null){
      this.camNameErr="Campaign Name Required."
    }
    if(this.startDateError==null){
   this.startDateError="Start Date Required"
    }
    if(this.endDateError==null){
    this.endDateError="End Date Required."
    }
    if(this.segmentError==null){
      this.segmentError="Segment Required."
    }
   
   

  }
  
  campaignNameChange(e:any){
    console.log(e.length);
    
    if(e.length<=0){
     this.camNameErr="Campaign Name Required."
     this.flow1=false
     this.Nxt=true
    }
    else{
      this.camNameErr=''
      this.flow1=true
      this.Nxt=false
    }
    for(let i=0; i<e.length;i++){
      if(e[i]=='<' || e[i]=='>'){
        
        this.camNameErr='Script not allowed!'
        this.flow1=false
        this.Nxt=false
      }
      // else{
      //   this.camNameErr=''
      // }
    }
    
    
    // this.obj.cName=e 
    if(this.flow1 && this.flow2 && this.flow3 && this.flow4){
      
    this.component.two=false
    this.Nxt=true
    }else{
      
      this.component.two=true
      this.Nxt=false
    }
  }
 
  campaignBudget(e:any){
    // this.obj.bget=e
    
  }
 
  campaignPercentage(e:any){
    console.log(e);
    
    // this.obj.percent=e 
  }
  startDate(event:any){
    if(event==null){
      this.flow3=false
    }
    else{
      this.flow3=true
    }
    
    this.startDateError=''
    
    this.startDay=event
    // this.endD=event
  
    
    
    if(this.startDay>this.copyEndDate){
      this.endDay=event
    }
    
  
    this.endDate =new Date(event)   
    if(this.flow1 && this.flow2 && this.flow3 && this.flow4 ){
    this.component.two=false
    this.Nxt=true
    }
    else{
      this.component.two=true
      this.Nxt=false
    }
    
    
  }
   
  endedtDate(event:any){
    if(event==null){
      this.flow4=false
      this.copyEndDate=''
    }
    else{
      this.flow4=true
      this.copyEndDate=event
    }
    
    this.endDateError=''
    this.endDay=event 
   
    if(this.flow1 && this.flow2 && this.flow3 && this.flow4 ){
    this.component.two=false
    this.Nxt=true
    }
    else{
      this.component.two=true
      this.Nxt=false
    }
  }

  segValue(event:any){
    this.flow2=true
    this.segmentError=''
    console.log(event);
    
    console.log(event.segmentName);
    console.log(event.segmentType);
    
    
    // this.segNameValue=event
    this.segType=event.segmentType
    this.service.apiSegId=event.segmentId
    this.service.apiSegType=event.segmentType
    this.service.segType=event.segmentType;
    this.service.segNames=event.segmentName  
    // alert(event.segmentType)
    if(event.segmentType=='Acquisition'){
      this.service.Acq='noMobileNot'

    }
    else{
      this.service.Acq=''
    }
    // this.obj.segmentValues=event.segmentName
    if(this.flow1 && this.flow2 && this.flow3 && this.flow4){
    this.component.two=false
    this.Nxt=true
    }
    
    else{
      this.component.two=true
        
    }
    let Recommended: any[]=[]
   let rec= this.service.Recommended.map((val:any) =>{
    return Recommended.push(val.segmentName)
    })
   
      if(Recommended.includes(event.segmentName)){
        console.log('true');
        this.saveOrRecommend='Recommended'
        this.service.saveOrRecommend='Recommended'
        
        this.show=true
      }
      else{
        this.show=false
        this.saveOrRecommend='Saved'
        this.service.saveOrRecommend='Saved'
      }
    
    
    
  
    
    this.dropDow=event.segmentType;
    this.dropDowone=event.segmentName;
    this.segmentId=event.segmentId;
    this.service.segName=event.segmentName

    
    if(event=="Upsell"){
this.upSell=true;
    }
    else{
      this.upSell=false
    }
    
  }
//  -----------------------------------------
  Budget(event:any){ 
    if(!(event.which>47 && event.which<58)){
    event.target.value="";  
    }   
    if(event.which>47&&event.which<58 && event.target.value.length <7){
     return true
    }
 else{
      return false
    }
  }
// -----------------------------



// -----------------------------
  per(event:any){
   
    
    if(event.target.value>100){
      this.targetError='Enter Valid Conversion Target.'
    }
    else{
      this.targetError=''
    }
    if(event.which==8){
      return true

    }
    if(!(event.which>47 && event.which<58)){
      event.target.value="";  
      }   
    
      
      if(event.target.value[0]==0){
        event.target.value="";
      }
      
      if(event.which>47&&event.which<58 ){
       return true
      }
   else{
        return false
      }

  }
  target(event:any){
   
    
    if(event.which>47&&event.which<58 ){
      return true
     }
  else{
       return false
     }
   

  }
  
  value :Date|any =new Date()

  
  selected="true"
 
  event={
budget:'',
conversionTarget:0,
endDate:'',
location:'',
name:'',
orgId:<any>0,
propensity: "",
region: "",
segmentCategory: "",
segmentId: "",
segmentName: "",
segmentSize: 0,
segmentType: "",
service:"",
startDate:'', 
subscriberCount:0 
  }

  save(callback:(success:boolean)=>void){ 
       
    this.event.budget=this.budget
    this.event.conversionTarget=Number(this.percentage)
    this.event.endDate=moment(this.endDay).format('YYYY-MM-DD'),
    this.event.location='',
    this.event.name=this.camName,
    this.event.orgId=localStorage.getItem('orgId') ? Number(localStorage.getItem('orgId')): 0,
    this.event.propensity= "",
    this.event.region= "",
    this.event.segmentCategory=this.saveOrRecommend,
    this.event.segmentId= this.service.apiSegId,
    this.event.segmentName=this.service.segNames
    this.event.segmentSize= 0,
    this.event.segmentType=this.service.apiSegType
    this.event.service="",
    this.event.startDate = moment(this.startDay).format('YYYY-MM-DD'), 
    this.event.subscriberCount=0
    let headers:HttpHeaders=new HttpHeaders()
    headers=headers.append('X-Calix-AccessToken',`${localStorage.getItem('access_token')}`);
    headers=headers.append("X-Calix-ClientID","kK1cJ0mRp7iSmTFt3vAGO44vobsu36op");
   

    
    // if(this.check==null) { 
      if( this.flow1 && this.flow2 && this.flow3 && this.flow4 && this.Nxt){
    
      
if(this.service.campaignId!== null){
  
Object.assign(this.event,{
  campaignId:this.service.campaignId}  )
  // this.event.segmentName=this.service.apiSegName,
  this.event.segmentType=this.service.apiSegType,
  this.event.segmentSize=1,
  this.event.subscriberCount=1
    this.http.put('https://stage.api.calix.ai/v1/cmc-campaigns/campaign',this.event,{headers}).subscribe((val:any) =>{
this.service.nonmobile.next(val.segmentSize);
this.service.mobile.next(val.segmentMobileAppSize);
this.service.ccc=val.segmentMobileAppSize
this.service.ccc1=val.segmentSize
this.service.pay.next(this.event)
this.service.payLoad=this.event;
this.sameCamapignName=true
this.service.er=true
this.http.get(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign/${this.service.campaignId}`,{headers}).subscribe((val:any)=>{
  console.log(val);
  this.sameCamapignName=true
  callback(true)
},(err:any) =>{
console.log(err);
callback(false)
})
callback(true)
    },(err:any)=>{
      console.log(err);
      this.service.er=false
      this.service.alreadyCampaign=true
      this.sameCamapignNameError=err.error.errorDesc
      console.log(err);
      callback(false)
      

    })}
    else if(this.service.campaignId==null ){
      this.http.post(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign`,this.event,{headers}).subscribe((value:any) =>{
       console.log(value.segmentSize);
       console.log(value.campaignId);
       this.service.campaignId=value.campaignId
       console.log( this.service.campaignId);
       this.service.subCampaignId.next(value.campaignId)
       
       
       this.postCampaign=value.campaignId
       
       this.service.segId=value.segmentId
       console.log(value.segmentSize);
       this.service.ccc=value.segmentMobileAppSize
       this.service.ccc1=value.segmentSize

       
       
      this.service.nonmobile.next(value.segmentSize);
this.service.mobile.next(value.segmentMobileAppSize);
this.valueseg=value.campaignId;
        console.log(value.segmentSize);
        console.log(value.segmentMobileAppSize);
        
        
        
       
       
      this.check=value.segmentExecutableSize
     
this.service.payLoad=this.event;
this.sameCamapignNameError=''
this.sameCamapignName=true
this.service.er=true


// important
// this.service.segmentName=this.login.value.segment.segmentName

this.http.get(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign/${value.campaignId}`,{headers}).subscribe((val:any)=>{
  console.log(val);
 
  callback(true)
  this.sameCamapignName=true
  this.service.checkAllEmpty=true
},(err:any) =>{
console.log(err);
callback(false)

})
callback(true)
        },(err:any)=>{
          console.log(err.error.errorDesc);
          this.service.er=false
          this.Nxt=false
          callback(false)
        
         
      
        
          this.sameCamapignNameError=err.error.errorDesc
          this.sameCamapignNameError='same campaign name already exists'
         
          this.sameCamapignName=false

        })
       
    }
  }
  
  

    this.NM.emit(this.camName)
    this.dum()

  }
  dum(){
  
    this.service.firstPatch=true
    this.service.camName=this.camName
    this.service.budgets=this.budget
    this.service.per=this.percentage
    this.service.sDay=this.startDay
    this.service.endDay=this.endDay
    this.service.segmentValues=this.segNameValue
    this.service.apiSegName=this.segmentName,
    this.service.apiSegType=this.segType
    
  }
}
