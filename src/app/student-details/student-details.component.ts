import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private formBuilder:FormBuilder ) { }
  ngOnInit() { }
  // enroll = Math.floor((Math.random())*1000000000000);

  studentArray:Array<any>=[];
  studentObj:object;

  studentForm = new FormGroup({
    'name' : new FormControl(null, Validators.required),
    'email' : new FormControl(null, [Validators.required,Validators.email]),
    'ph' : new FormControl(null,  [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    'dob' : new FormControl(null, Validators.required),
    'gender' : new FormControl(null, Validators.required),
    'semester' : new FormControl(1, Validators.required),
    'terms' : new FormControl(null, Validators.required),
    'subjectNum': new FormControl(1, Validators.required),
    
    'subjectArray': new FormArray([])
  });
  
  // subjectArray = new FormArray([]);

  // This function adds the subject fields( subject name & marks)
  onAddSubject(val){
   const control = new FormControl(null, Validators.required);
   (<FormArray>this.studentForm.get('subjectArray')).length==0;
   for(let i=0; i<=val-1; i++){
    (<FormArray>this.studentForm.get('subjectArray')).push(control); 
   }
  }

  // getter
  get subControls(){
    return (<FormArray>this.studentForm.get('subjectArray')).controls;
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
    }

    this.studentArray.push(this.studentObj);
    console.log(this.studentArray);
    // console.log(this.terms);
    this.studentForm.reset();
  }

}
