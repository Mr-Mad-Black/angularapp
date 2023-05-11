import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CampaignflowService } from 'src/app/campaignflow.service';




@Component({
  selector: 'app-campaigndatatable',
  templateUrl: './campaigndatatable.component.html',
  styleUrls: ['./campaigndatatable.component.scss']
})
export class CampaigndatatableComponent implements OnInit {
  values: any;
  selectedCar: any
  campaignId: any;
  
  @ViewChild('content') content: any;
  @ViewChild('deleted') deleted:any
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective | any;

  modalRef: any;
  type = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Acquisition' },
    { id: 2, name: 'Retention' },
    { id: 3, name: 'Upload' },
    { id: 4, name: 'Upsell' },
    { id: 5, name: 'Triggered' },
  ];
  status:any=[
    {id:0, name:'All'},
    {id:1, name:'Complete'},
    {id:2, name:'Draft'},
    {id:3, name:'In-Progress'},
    {id:4,name:'Active'},
    {id:5,name:'paused'}
  ]
  campaignType: any
  campaignStatus:any;
  filteredValues: any[] = [];
  Filter: any;
  statusName: any;
  FilterName: any;
  constructor(private http: HttpClient, private modalService: NgbModal,private router: Router, private route: ActivatedRoute ,public service:CampaignflowService) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  editButton: any;
  

  ngOnInit() {
    if(this.service.refreshtable==true){
      location.reload();
    }
    this.campaignType = this.type[0].name
    this.campaignStatus=this.status[0].name
this.campaignStatus='All'
this.campaignType='All'

    this.campaigntable()
  

  }
  
  searching(event:any){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(event.target.value).draw();
    });
    

  }
 
  filter(){
    if (this.campaignType == 'All' && this.campaignStatus == 'All') {
      this.filteredValues = this.values;
    } else if (this.campaignType == 'All' && this.campaignStatus != 'All') {
      this.filteredValues = this.values.filter(
        (x:any) => x.status == this.campaignStatus
        
      );
    }
    else if (this.campaignType != 'All' && this.campaignStatus == 'All') {
      this.filteredValues = this.values.filter(
        (x:any) => x.segmentType == this.campaignType
      );
    }
    else {
      this.filteredValues = this.values.filter(
        (x:any) => x.segmentType == this.campaignType && x.status == this.campaignStatus
      );
    }
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next('');
      
     
    })
    
  }

  obj1 = {
    id: 2
  }

  obj2 = {}

  campaigntable() {
    console.log();
    
    this.dtOptions = {
      processing: true,
      pageLength: 10,
      lengthChange: false,
      ordering: true,
      searching: true,
      retrieve: true,
    
      
    };
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append('X-Calix-AccessToken', `${localStorage.getItem('access_token')}`);
    headers = headers.append("X-Calix-ClientID", "kK1cJ0mRp7iSmTFt3vAGO44vobsu36op")
    this.http.get(
      'https://stage.api.calix.ai/v1/cmc-campaigns/campaign/campaign-list?langId=1', { headers }
    ).subscribe((resp: any) => {
      console.log(resp);
      for (let i = 0; i < resp.length; i++) {
        this.editButton = resp[i].status
      }

      console.log(resp.status);
      this.values = resp;
      this.filteredValues = [...this.values];
      this.dtTrigger.next('');
    });
  }
  next() {

  }
  edit(event: any) {
    this.service.editCampaignId=event.campaignId
    this.router.navigate(['campaign/newcampaign']);
  }
  delete(event: any) {

    this.campaignId = event.campaignId
    this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }
  close() {
    this.modalRef.close();
  }

  yes() {
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append('X-Calix-AccessToken', `${localStorage.getItem('access_token')}`);
    headers = headers.append("X-Calix-ClientID", "kK1cJ0mRp7iSmTFt3vAGO44vobsu36op");

    this.http.delete(`https://stage.api.calix.ai/v1/cmc-campaigns/campaign/${this.campaignId}`, { headers }).subscribe((val: any) => {
      console.log(val);
      this.filteredValues=this.values
      this.modalRef = this.modalService.open(this.deleted, { ariaLabelledBy: 'modal-basic-title' });
      this.campaigntable()
      setTimeout(() => {
        this.close()
      }, 500)
    }, (err: any) => {
      console.log(err);

    })
    setTimeout(() => {
      this.close()
    }, 300)


  }
  all() {
    alert("hui")
  }
  all1() {
    alert("hui")
  }


}
