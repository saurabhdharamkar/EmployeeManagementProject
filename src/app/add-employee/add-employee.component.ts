import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeClass } from '../model/EmployeeClass';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeModelObj:EmployeeClass = new EmployeeClass();
  formVal!: FormGroup;
  employeeData!:any;
  constructor(private api:ApiService,private formBuilder: FormBuilder) { }

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
  getEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData  = res;
    })
  }
  showAdd!:boolean;
  showUpdate!:boolean;
  postEmployeeDetails(){
    this.employeeModelObj.name = this.formVal.value.name;
    this.employeeModelObj.type = this.formVal.value.type;
    this.employeeModelObj.salary = this.formVal.value.salary;
    this.employeeModelObj.phone = this.formVal.value.phone;
    this.employeeModelObj.address = this.formVal.value.address;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      this.formVal.reset();
      this.getEmployee();
    },
    err=>{
      alert("Error!");
    }
    )
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
