import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../Models/Customer';
import { serviceRequest } from '../Models/serviceRequest';
import { CustomerService } from '../Services/CustomerService';
import { requestService } from '../Services/requestService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public closedList = false;
  public reopenBtn = false;
  public showNew = false;
  public showReq = true;
  public showPro = false;
  public showPending = true
  public isManager = false;
  public isEdit = false;
  public showAlert = false;
  public showErrAlert = false;
  public alertMessage = "";
  public showAction = true;


  requests: serviceRequest[] = [];
  customers: Customer[] =[];
  customer : Customer = new Customer();
  pendingRequests: serviceRequest[] = [];
  closedReq: serviceRequest[] = [];
  request: serviceRequest = new serviceRequest();
  public userName = localStorage.getItem('userName');
  public roleName = localStorage.getItem('Role');
  public id = localStorage.getItem('userId');
  user: string = "";
  role: string = "";
  constructor(private _service: requestService, private _cService: CustomerService, private _router: Router, private http: HttpClient) { }
  ErrorMessage: any = '';



  ngOnInit(): void {
    this.user = this.userName !== null ? this.userName : "";
    this.role = this.roleName !== null ? this.roleName : "";
    if (this.roleName == "Manager")
    {
      this.isManager = true;
      this.showAction = false;
    }
    this.ShowPending();
    this.getCustomer();
    document.getElementById('loading')!
    .style.display = 'none';
  }
getAll(){
  this._cService.getAll().subscribe(res => {
    this.customers=res;
  }, res => {
    console.log(res);
  });
}


getCustomer(){
  this._cService.getCustomer(this.id).subscribe(res=>{
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
    this.customer.Password = res.password;
    this.customer.Role = res.role;
    debugger;
   },res=>
   {
     console.log(res);
     this.ErrorMessage="Some error have occured";
     document.getElementById('btnErrorMsg')?.click();
   });

}
  loadRequests() {
    debugger;
        if (this.roleName == "Manager") {
  

      this._service.geRequests(localStorage.getItem('userId')).subscribe(res => {
        document.getElementById('loading')!.style.display = 'none';
        for (var re of res) {

          if (re.status == "Pending") {
            this.pendingRequests.push(re);
          }
          else{
            this.closedReq.push(re);
           
          }
        }
        this.requests = this.pendingRequests;
      }, res => {
        document.getElementById('loading')!.style.display = 'none';
        this.ErrorMessage = "Some error have occured";
        document.getElementById('btnErrorMsg')?.click();
      });
    }
    else {
      this._service.getPending(localStorage.getItem('userId')).subscribe(res => {
        for (var re of res) {
                  
          if (re.status == "Pending") {
            this.pendingRequests.push(re);
          }
          else{
            this.closedReq.push(re);
          }
        }
        this.requests = this.pendingRequests;
      }, res => {
        this.ErrorMessage = "Some error have occured";
        document.getElementById('btnErrorMsg')?.click();
      });
    }
  }
  OpenLogin() {
    localStorage.setItem('token', "empty");
    localStorage.setItem('userName', "empty");
    localStorage.setItem('userId', "empty");
    localStorage.setItem('Role', "empty");
  }



  DeleteRequest(input: any) {
    document.getElementById('loading')!.style.display = 'block';
    this._service.deleteBook(input.id).subscribe(res => {
      document.getElementById('loading')!.style.display = 'none';
      this.alertMessage = "Request Deleted Successfully...";
      this.showAlert = true;
      setTimeout(() => { this.showAlert = false }, 2500);
      this.pendingRequests = [];
      this.closedReq = [];
      debugger;
      this.ShowPending();
    }, res => {
      console.log(res);
      document.getElementById('loading')!.style.display = 'none';
      this.showErrAlert = true;
      this.alertMessage ="Error Occured.."
     setTimeout(() => { this.showErrAlert = false ;}, 2500);
      this.ErrorMessage = "Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });

  }
  openForm(input: any) {
    this.isEdit = true;
    this.showNew = true;
    this.showReq = false;
    this.request = input;
    this.showPending = false;
    this.closedList = false;
    this.showPro = false;
  }

  ShowPending() {
    this.pendingRequests = [];
    this.closedReq = [];
    debugger;
    document.getElementById('loading')!.style.display = 'block';

    this.loadRequests();
    document.getElementById('loading')!.style.display = 'none';

    this.requests = this.pendingRequests;
    this.reopenBtn = false;
    this.closedList = false;
    this.showNew = false;
    this.showReq = true;
    this.showPending = true;
    this.showPro = false;
  }

  ShowClosed() {
    this.requests = this.closedReq;
    this.reopenBtn = true;
    this.closedList = true;
    this.showNew = false;
    this.showReq = true;
    this.showPending = false;
    this.showPro = false;
  }
  OpenProfile(){
    this.showReq = false;
    this.showNew = false;
    this.showPro = true;
    this.showPending = false;
    this.closedList = false;
  }

  ShowForm() {
    this.showNew = true;
    this.request = new serviceRequest();
    this.showReq = false;
    this.closedList = false;
    this.showPending = false;
    this.showPro = false;

  }

  changeType(event: any) {
    var type = (event.target as HTMLInputElement).value;
    this.request.reqType = type;
  }

  Reopen(input: any) {
    document.getElementById('loading')!
    .style.display = 'block';
    var reqDto = {
      Id: input.id,
      Title: input.title,
      ReuestDetails: input.reuestDetails,
      ReqType: input.reqType,
      RequestedBy: localStorage.getItem('userId'),
      AssignedTo: "9",
      Status: "Pending",
      RequestDate : input.requestDate
    };
   
    this._service.EditRequest(reqDto).subscribe(res => {
      // this._router.navigate(['author']);
      document.getElementById('loading')!.style.display = 'none';
      this.alertMessage = "Request Reopend Successfully";
      this.showAlert = true;
      setTimeout(() => { this.showAlert = false }, 2500);
      this.pendingRequests = [];
      this.closedReq = [];
      this.ShowPending();
      this.request = new serviceRequest();
    }, res => {
      document.getElementById('loading')!.style.display = 'none';
      console.log(res);
      this.showErrAlert = true;
      this.alertMessage ="Error Occured.."
     setTimeout(() => { this.showErrAlert = false ;}, 2500);
      this.ErrorMessage = "Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });
  }

  Approve(input: any, action: Boolean) {
    document.getElementById('loading')!
    .style.display = 'block';
    var reqDto = {
      Id: input.id,
      Title: input.title,
      ReuestDetails: input.reuestDetails,
      ReqType: input.reqType,
      RequestedBy: input.requestedBy,
      AssignedTo: "9",
      Status: "Closed",
      RequestDate : input.requestDate
    };
    if (!action) {
   
      reqDto.Status = "Rejected"
    }
  
    this._service.EditRequest(reqDto).subscribe(res => {
      // this._router.navigate(['author']);
      // setTimeout(() => { this.saveSuccess = false }, 2000);
      document.getElementById('loading')!.style.display = 'none';
      if (action) {
      this.alertMessage = "Request Approved Successfully";
      this.showAlert = true;
    }
    else{
      this.showErrAlert = true;
      this.alertMessage="Request Rejected..."
    }
      setTimeout(() => { this.showAlert = false ;this.showErrAlert = false;}, 2500);
      this.pendingRequests = [];
      this.closedReq = [];
      this.ShowPending();
      this.request = new serviceRequest();
    }, res => {
      document.getElementById('loading')!.style.display = 'none';
      console.log(res);
      this.showErrAlert = true;
      this.alertMessage ="Error Occured.."
     setTimeout(() => { this.showErrAlert = false ;}, 2500);
      this.ErrorMessage = "Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });
  }

  AddRequest() {
    document.getElementById('loading')!
    .style.display = 'block';
    var reqDto = {
      Title: this.request.title,
      ReuestDetails: this.request.reuestDetails,
      ReqType: this.request.reqType,
      RequestedBy: this.id,
      AssignedTo: "9",
      Status: "Pending",
      RequestDate : new Date
    };
   
    if (!this.isEdit) {
      debugger;
      this._service.addRequest(reqDto).subscribe(res => {
        // this._router.navigate(['author']);
        // setTimeout(() => { this.saveSuccess = false }, 2000);
        document.getElementById('loading')!.style.display = 'none';
        this.alertMessage = "Request Submitted Successfully..";
        this.showAlert = true;
        setTimeout(() => { this.showAlert = false }, 2500);
        this.pendingRequests = [];
        this.closedReq = [];
        this.ShowPending();
        this.request = new serviceRequest();
      }, res => {
        document.getElementById('loading')!.style.display = 'none';
        console.log(res);
        this.showErrAlert = true;
        this.alertMessage ="Error Occured.."
       setTimeout(() => { this.showErrAlert = false ;}, 2500);
        this.ErrorMessage = "Some error have occured";
        document.getElementById('btnErrorMsg')?.click();
      });
    }
    else {
      var eReqDto = {
        Id: this.request.id,
        Title: this.request.title,
        ReuestDetails: this.request.reuestDetails,
        ReqType: this.request.reqType,
        RequestedBy: this.id,
        AssignedTo: "9",
        Status: "Pending",
        RequestDate : this.request.requestDate
      };
      this._service.EditRequest(eReqDto).subscribe(res => {
        // this._router.navigate(['author']);
        // setTimeout(() => { this.saveSuccess = false }, 2000);
        document.getElementById('loading')!.style.display = 'none';
        this.alertMessage = "Request Updated Successfully";
        this.showAlert = true;
        setTimeout(() => { this.showAlert = false }, 2500);
        this.pendingRequests = [];
        this.closedReq = [];
        this.ShowPending();
        this.request = new serviceRequest();
      }, res => {
        document.getElementById('loading')!.style.display = 'none';
        console.log(res);
        this.showErrAlert = true;
        this.alertMessage ="Error Occured.."
       setTimeout(() => { this.showErrAlert = false ;}, 2500);
        this.ErrorMessage = "Some error have occured";
        document.getElementById('btnErrorMsg')?.click();
      });
    }
  }

}
