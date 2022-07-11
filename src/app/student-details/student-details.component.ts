import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CentralServService } from '../central-serv.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private centralServ:CentralServService ) { }
  ngOnInit() { this.studentArray = this.centralServ.getDetailList(); }

  studentArray:Array<any>=[];
  studentObj:object;
  // subjectArray= new FormArray([]);
  grade:string;
  divider:number;
  total:number;



  studentForm = new FormGroup({
    'name' : new FormControl(null, Validators.required),
    'email' : new FormControl(null, [Validators.required,Validators.email]),
    'ph' : new FormControl(null,  [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    'dob' : new FormControl(null, Validators.required),
    'gender' : new FormControl(null, Validators.required),
    'semester' : new FormControl(null, Validators.required),
    'terms' : new FormControl(null, Validators.required),
    'subjectNum': new FormControl(null, Validators.required),

    'subjectArray': new FormArray([])
  });


  // This function sets region for the phone number input field
  onRegionSelected(region){
    if(region=="india"){
      this.studentForm.get('ph').setValidators([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
    }
    else if(region=="usa"){
      this.studentForm.get('ph').setValidators([Validators.required, Validators.pattern("^((\\+1-?)|0)?[0-9]{12}$")]);

    }
  }

  // This function adds the subject fields( subject name & marks)
  onAddSubject(val){
   const control = new FormControl(null, Validators.required);
   this.divider=val;
   (<FormArray>this.studentForm.get('subjectArray')).clear();
   for(let i=0; i<=val-1; i++){
    (<FormArray>this.studentForm.get('subjectArray')).push(
      this.formBuilder.group({
       'subject' : new FormControl(null, Validators.required),
       'marks' : new FormControl(null, Validators.required)
      })
    );
   }
  }

  // getter
  get subControls(){
    return (<FormArray>this.studentForm.get('subjectArray')).controls;
  }

  // This function gets total marks
  getTotalMarks(){
   let arr= this.studentForm.get('subjectArray') as FormArray;
   let value= arr.value;

   console.log(this.studentForm.get('subjectArray').value);

    if(this.divider==1){
      this.total = (arr.value[0].marks)/this.divider;
    }
    else if(this.divider==2){
      this.total = (arr.value[0].marks + arr.value[1].marks)/this.divider;
    }
    else{
      this.total = (arr.value[0].marks + arr.value[1].marks + arr.value[2].marks)/this.divider;
    }

   console.log( "tot "+this.total);
   switch(true){
    case ( this.total >=80 ):
        this.grade='A';break;
    case ( this.total >=70 && this.total<80 ):
        this.grade='B';break;
    case ( this.total >=60 && this.total<70 ):
        this.grade='C';break;
    case ( this.total >=50 && this.total<60 ):
        this.grade='D';break;
    case ( this.total >=33 && this.total<50 ):
        this.grade='E';break;
    default:
        this.grade='F';
   }

  }

  // This function submits the form data
  onSubmit(){
    this.studentObj={
      enroll: Math.floor((Math.random())*1000000000000),
      name: this.studentForm.get('name').value,
      email: this.studentForm.get('email').value,
      ph: this.studentForm.get('ph').value,
      dob: this.studentForm.get('dob').value,
      gender: this.studentForm.get('gender').value,
      semester: this.studentForm.get('semester').value,
      grade: this.grade
    }


    this.studentArray.push(this.studentObj);
    this.centralServ.studentData.next(this.studentArray);
    // console.log("--"+JSON.stringify(this.subjectArray));
    // console.log(this.studentForm.controls['subjectArray'].controls['marks'].value);
    this.studentForm.reset();
  }


}
