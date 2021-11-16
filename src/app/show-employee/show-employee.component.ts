import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeClass } from '../model/EmployeeClass';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  formVal!: FormGroup;
  //Created object of class to post data
  employeeModelObj:EmployeeClass = new EmployeeClass();

  employeeData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formBuilder: FormBuilder, private api:ApiService) {
    
   }

  ngOnInit(): void {

    this.formVal = this.formBuilder.group({
      name: [''],
      type: [''],
      salary: [''],
      phone: [''],
      address: ['']
    });
    this.getEmployee();
  }
  postEmployeeDetails(){
    this.employeeModelObj.name = this.formVal.value.name;
    this.employeeModelObj.type = this.formVal.value.type;
    this.employeeModelObj.salary = this.formVal.value.salary;
    this.employeeModelObj.phone = this.formVal.value.phone;
    this.employeeModelObj.address = this.formVal.value.address;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      // alert("Material Added");
      let cancl = document.getElementById('cancel');
      cancl?.click();
      //Resetting the form
      this.formVal.reset();
      this.getEmployee();
    },
    err=>{
      alert("Error!");
    }
    )
  }
  clickAddEmployee(){
    this.formVal.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData = res;

    })
  }
  deleteEmployee(a:any){
    this.api.deleteEmployee(a.id).subscribe(res=>{
      
      this.getEmployee();
    })
  }

  onEdit(a:any){
    
    this.employeeModelObj.id = a.id;
    this.formVal.controls['name'].setValue(a.name);
    this.formVal.controls['type'].setValue(a.type);
    this.formVal.controls['salary'].setValue(a.salary);
    this.formVal.controls['phone'].setValue(a.phone);
    this.formVal.controls['address'].setValue(a.address);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.name = this.formVal.value.name;
    this.employeeModelObj.type = this.formVal.value.type;
    this.employeeModelObj.salary = this.formVal.value.salary;
    this.employeeModelObj.phone = this.formVal.value.phone;
    this.employeeModelObj.address = this.formVal.value.address;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe((res: any)=>{
      // alert("Updated");
      let cancl = document.getElementById('cancel');
      cancl?.click();
      //Resetting the form
      this.formVal.reset();
      this.getEmployee();
    })

  }


}
