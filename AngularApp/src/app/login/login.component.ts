import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../Models/Customer';
import { CustomerService } from '../Services/CustomerService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _service:CustomerService,private _router:Router,private http: HttpClient) { }
  ErrorMessage:any='';
  public showAlert = false;
  public showUAlert = false;
  public showEAlert = false;
   public showErrAlert =false;
  public openLogin = true;
  public isLoggedin  = false;
  public isPhone = true;
  public isEmail = false;
  public heading ="Register";
  public userName = localStorage.getItem('userName');
  public id = localStorage.getItem('userId');
  customer : Customer = new Customer();
  public alertMsg ="Successfully LoggedIn..."

  countryList: Array<any> = [
    { name: 'India', cities: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam','Bihar','chhatisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala'] },
    { name: 'Australia', cities: ['New South Wales','Queensland','Northern Territory','Western Australia','South Australia','Victoria'] },
    { name: 'Canada', cities: [' Quebec','Ontario','British Columbia','Alberta'] },
  ];
 cities: Array<any> = new Array();;

 changeCountry(event:any) {
  var count =(event.target as HTMLInputElement).value;
  this.customer.Country = count;
  this.cities = this.countryList.find(con => con.name == count).cities;
}
changeState(event:any){
  var state =(event.target as HTMLInputElement).value;
  this.customer.State = state;
}

  ngOnInit(): void {
    document.getElementById('loading')!.style.display = 'none';
    if(this.userName != "empty")
    {
      this.isLoggedin = true;
      this.getCustomer();
      this.OpenPopup();
      this.heading = "Update Profile";
    }
  
  }
  getCustomer(){
    this._service.getCustomer(this.id).subscribe(res=>{
      this.customer.Address = res.address;
      this.customer.Name = res.name;
      this.customer.Country = res.country;
      this.customer.State = res.state;
      this.customer.DOB = res.dob;
      this.customer.Id = res.id;
      this.customer.PAN = res.pan;
      this.customer.Phone = res.phone;
      this.customer.Email = res.email;
      this.customer.PrimaryContact = res.primaryContact;
      this.userName = res.name;
      if(res.primaryContact == "Phone")
      {
        this.isPhone = true;
        this.isEmail = false;
      }
      if(res.primaryContact == "Email")
      {
        this.isPhone = false;
        this.isEmail = true;
      }
      this.customer.Password = res.password;
      this.cities = this.countryList.find(con => con.name == res.country).cities;
      debugger;
     },res=>
     {
       console.log(res);
       this.ErrorMessage="Some error have occured";
       document.getElementById('btnErrorMsg')?.click();
     });

  }


  Register(){
    document.getElementById('loading')!
    .style.display = 'block';
    
    var customerDto = {
      Id : 0,
      Name: this.customer.Name,
      Password: this.customer.Password,
      Email: this.customer.Email,
      Country: this.customer.Country,
      State: this.customer.State,
      Address:this.customer.Address,
      PAN: this.customer.PAN,
      Phone: this.customer.Phone,
      PrimaryContact:this.customer.PrimaryContact,
      DOB: this.customer.DOB,
      Role:"User"
    };
    if(this.isLoggedin == true)
    {
      customerDto.Id = this.customer.Id;
      debugger;
      this._service.updateCustomer(customerDto).subscribe(res=>{
        document.getElementById('loading')!
        .style.display = 'none';
        this.showUAlert = true;
        this.alertMsg ="Details Updated Successfully";
        setTimeout(() => { this.showUAlert = false ;this._router.navigate(['home']);}, 2500);
        this.getCustomer();
        this.customer = new Customer();
       },res=>
       {
        document.getElementById('loading')!.style.display = 'none';
         console.log(res);
         this.showEAlert = true;
         this.alertMsg ="Error Occured";
        setTimeout(() => { this.showEAlert = false ;}, 2500);
         this.ErrorMessage="Some error have occured";
         document.getElementById('btnErrorMsg')?.click();
       });
    }
    else{
    debugger;
    this._service.addCustomer(customerDto).subscribe(res=>{
      document.getElementById('loading')!
      .style.display = 'none';
      this.alertMsg="User Added Successfully";
      this.showUAlert = true;
      setTimeout(() => { this.showUAlert = false; this.OpenLogin(); }, 2500);

      this.customer = new Customer();
     },res=>
     {
      document.getElementById('loading')!.style.display = 'none';
       console.log(res);
       this.showEAlert = true;
       this.alertMsg ="Email Already Exists....."
      setTimeout(() => { this.showEAlert = false ;}, 2500);
       this.ErrorMessage="Some error have occured";
       document.getElementById('btnErrorMsg')?.click();
     });
    }
  }

  selectPre(event:any){
  
    this.customer.PrimaryContact= event.target.value;
  }

 login(){
  document.getElementById('loading')!
  .style.display = 'block';
  var customerDto = {
    Name: this.customer.Name,
    Password: this.customer.Password,
    Email: this.customer.Email,
    Country: this.customer.Country,
    State: this.customer.State,
    Address:this.customer.Address,
    PAN: this.customer.PAN,
    Phone: this.customer.Phone,
    PrimaryContact: this.customer.PrimaryContact,
    DOB: this.customer.DOB,
    Role:"User"
  };
  debugger;
  this._service.login(customerDto).subscribe(res=>{
    document.getElementById('loading')!
    .style.display = 'none';
    this.showAlert = true;
    this.alertMsg ="Successfully LoggedIn..."
    setTimeout(() => { this.showAlert = false ;this._router.navigate(['home']);}, 2500);
      localStorage.setItem('Role',res.userData.role )
      localStorage.setItem('userName',res.userData.name);
      localStorage.setItem('userId',res.userData.id);
      localStorage.setItem('token',res.token);
    this.customer = new Customer();
   },res=>
   {
    document.getElementById('loading')!.style.display = 'none';
     console.log(res);
     this.showErrAlert = true;
     this.alertMsg ="Incorrect Credentials.. Please check...."
    setTimeout(() => { this.showErrAlert = false ;}, 2500);
    
     this.ErrorMessage="Some error have occured";
     document.getElementById('btnErrorMsg')?.click();
   });

 }
  
  OpenPopup(){
    this.openLogin = false;
  }
  OpenLogin(){
    this.openLogin = true;
    localStorage.setItem('token', "empty");
    localStorage.setItem('userName',"empty");
    localStorage.setItem('userId',"empty");
    localStorage.setItem('Role',"empty");
    this.isLoggedin = false;
    this.customer = new Customer();
  }
}
