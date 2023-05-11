import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  password=false;
  next=true;
  click=false;
  disabled=false;
  userNameValue:any;
  errormessage:any="";
    login:any=new FormGroup({
    loginName:new FormControl(''),
    loginPassword:new FormControl('')
  })
  constructor(private http:HttpClient, private route:Router){}
  ngOnInit(){}
  submit(value:any){
    this.disabled=false
    if(!value.loginName){
      this.errormessage='Missing Username'
    }
   
    else{
      this.click=true;
      this.errormessage=""
      this.userNameValue=value.loginName
      this.login.patchValue({loginPassword:""})
      let headers:HttpHeaders=new HttpHeaders();
      headers=headers.append("X-Calix-AccessToken", "token");
      headers=headers.append("X-Calix-ClientID","kK1cJ0mRp7iSmTFt3vAGO44vobsu36op")
    this.http.get(`https://stage.api.calix.ai/v1/authentication/usertype?username=${value.loginName}`,{headers}).subscribe((xvalue:any)=>{
      
            if(xvalue.success=="local"){
        this.next=false;
        this.password=true
      } 
      else{
        this.route.navigate(['/calixEmoloyee'])
      }
    },(err:any) =>{
      console.log(err);
    });
    }
    
  }
 
  signin(value:any){  
   
      if((!value.loginName && !value.loginPassword) || !value.loginName){
      this.errormessage="Missing Username";
       this.password=false;
        this.click=false;
        this.next=true; 

    }
     else if(!value.loginPassword){
      this.errormessage="Please enter Password"
    }
    else{
  let payload=`grant_type=password&client_secret=6QcEcYE6c3kZCklO&username=${value.loginName.trim()}&password=${value.loginPassword}`
  let headers:HttpHeaders=new HttpHeaders();
  headers=headers.append('X-Calix-ClientID','kK1cJ0mRp7iSmTFt3vAGO44vobsu36op');
  headers=headers.append('Content-Type','application/x-www-form-urlencoded')
  this.disabled=true
    this.http.post('https://stage.api.calix.ai/v1/authentication/token',payload,{headers}).subscribe((val:any) =>{
      localStorage.setItem('orgId',val.OrgId);
      localStorage.setItem('access_token',val.access_token)
    this.route.navigate(['/campaign/campaigndatatable'])  
  },(err:any) =>{
        this.errormessage=err.error
        this.password=false;
        this.click=false;
        this.next=true;      
    })
  }
}

}
