import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class Customer{
    Id:number=0;
    Name:string="";
    Country:string="";
    State:string="";
    Address:string="";
    Email:string="";
    PAN:string="";
    Phone:string="";
    PrimaryContact:string="";
    Password:string="";
    DOB:Date = new Date;
    Role:string = "";
    public formCustomerGroup : FormGroup;
constructor(){
    var _builder = new FormBuilder();

  
    this.formCustomerGroup = _builder.group({
        userNameControl: new FormControl('',Validators.compose([Validators.required])),
        userPhoneContrl: new FormControl('',Validators.compose([Validators.required,Validators.pattern("[0-9 ]{10}")])),
        userEmailControl: new FormControl('',Validators.compose([Validators.required,Validators.email])),
        userReqControl: new FormControl('',Validators.compose([Validators.required])),
        passControl : new FormControl('',Validators.required),
        confirmControl : new FormControl('',Validators.required),
        panControl : new FormControl('',Validators.compose([Validators.required,Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")])),
        stateControl : new FormControl('',Validators.required),
        countryCntrol : new FormControl('',Validators.required),
        dateControl : new FormControl('',Validators.required),
        addressControl :new FormControl('',Validators.required)
    },
    {
    validators : this.mustMatch('passControl','confirmControl')
    }
    
    );
    
}
mustMatch(p:any,cp:any){
    return (formGroup:FormGroup) =>{
        const passControl = formGroup.controls[p];
        const confirmControl = formGroup.controls[cp];
        if(confirmControl.errors && !confirmControl.errors['mustMatch']){
            return;
        }
        if(passControl.value!==confirmControl.value)
        {
            confirmControl.setErrors({mustMatch:true});
        }
      
        else{
            confirmControl.setErrors(null);
        }
    };

}
   
}