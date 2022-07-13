import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CentralServService, dataObject } from '../central-serv.service';
import { StudentListComponent } from '../student-list/student-list.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {


  constructor( private formBuilder:FormBuilder,
               private centralServ:CentralServService ,
               private router:Router) { }

  ngOnInit() {

    this.studentArray = this.centralServ.getDetailList();

    // this.centralServ.editObjCentral.subscribe( index => { this.editObjIndex = index;});
    this.centralServ.editMode.subscribe((ed) => { this.editModeDetail= ed;});
    this.centralServ.editObj.subscribe( obj => { this.editObj = obj; this.editObjEnroll = obj.enroll;});

    this.editObjIndex = this.studentArray.indexOf(this.editObj);
    if(this.editModeDetail){
      // this.centralServ.editObj.subscribe( obj => { this.editObj = obj;} );

      this.studentForm.patchValue(
        { name: this.editObj.name ,
          email:this.editObj.email,
          ph:this.editObj.ph,
          dob:this.editObj.dob,
          gender: this.editObj.gender,
          semester:this.editObj.semester,
          subjectNum:this.editObj.subjectNum,
          subjectArray:this.editObj.subject,
        } );
        // console.log("- | -"+JSON.stringify(this.editObj.subject));

        this.divider=this.editObj.subjectNum;

        for( let i=0; i <= this.editObj.subjectNum-1; i++){
          (<FormArray>this.studentForm.get('subjectArray')).push(
           this.formBuilder.group({
            'subject' : new FormControl(this.editObj.subject[i]['subject'], [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
            'marks' : new FormControl(this.editObj.subject[i]['marks'], [Validators.required, Validators.min(0), Validators.max(100)])
           })
           )
        }
       this.editObj=null;
    }



  }

  studentArray:Array<dataObject>=[];

  grade:string;
  divider:number;
  editModeDetail:boolean=false;
  editObjIndex:number;
  editObj:dataObject;
  editObjEnroll:number;


  studentForm = new FormGroup({
    'name' : new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
    'email' : new FormControl(null, [Validators.required,Validators.email]),
    'ph' : new FormControl(null,  [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    'dob' : new FormControl(null, [ Validators.required ]),
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

  //This function checks if the entered dob is greater than today or not
  checkDob(){
    const todayDate = new Date();
    // console.log(this.todayDate.getFullYear()+'-' +("0"+ (this.todayDate.getMonth()+1)).slice(-2) + '-'+ ("0"+ this.todayDate.getDate()).slice(-2));
    // console.log(this.studentForm.get('dob').value);
    if(this.studentForm.get('dob').value > (todayDate.getFullYear()+'-' +("0"+ (todayDate.getMonth()+1)).slice(-2) + '-'+ ("0"+ todayDate.getDate()).slice(-2)))
    {
      this.studentForm.patchValue({dob:null});
    }
  }

  // This function adds the subject fields( subject name & marks)
  onAddSubject(val){


  //  const control = new FormControl(null, Validators.required);
   this.divider=val;
   (<FormArray>this.studentForm.get('subjectArray')).clear();
   for(let i=0; i<=val-1; i++){
    (<FormArray>this.studentForm.get('subjectArray')).push(
      this.formBuilder.group({
       'subject' : new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
       'marks' : new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)])
      })
    );
   }
  }

  // getter
  get subControls(){
    return (<FormArray>this.studentForm.get('subjectArray')).controls;
  }


  // This function submits the form data
  onSubmit(){

    let total:number;

    let arr= this.studentForm.get('subjectArray') as FormArray;

      if(this.divider==1){
        total = (arr.value[0].marks)/this.divider;
      }
      else if(this.divider==2){
        total = (arr.value[0].marks + arr.value[1].marks)/this.divider;
      }
      else{
        total = (arr.value[0].marks + arr.value[1].marks + arr.value[2].marks)/this.divider;
      }

    switch(true){
      case ( total >=80 ):
          this.grade='A';break;
      case ( total >=70 && total<80 ):
          this.grade='B';break;
      case ( total >=60 && total<70 ):
          this.grade='C';break;
      case ( total >=50 && total<60 ):
          this.grade='D';break;
      case ( total >=33 && total<50 ):
          this.grade='E';break;
      default:
          this.grade='F';
     }

    // let studentObj={
    //   enroll: Math.floor((Math.random())*1000000000000),
    //   name: this.studentForm.get('name').value,
    //   email: this.studentForm.get('email').value,
    //   ph: this.studentForm.get('ph').value,
    //   dob: this.studentForm.get('dob').value,
    //   gender: this.studentForm.get('gender').value,
    //   semester: this.studentForm.get('semester').value,
    //   subjectNum: this.studentForm.get('subjectNum').value,
    //   grade: this.grade,
    //   subject:this.studentForm.get('subjectArray').value
    // }

    if(!this.editModeDetail){  //Edit mode off

      let studentObj={
        enroll: Math.floor((Math.random())*1000000000000),
        name: this.studentForm.get('name').value,
        email: this.studentForm.get('email').value,
        ph: this.studentForm.get('ph').value,
        dob: this.studentForm.get('dob').value,
        gender: this.studentForm.get('gender').value,
        semester: this.studentForm.get('semester').value,
        subjectNum: this.studentForm.get('subjectNum').value,
        grade: this.grade,
        subject:this.studentForm.get('subjectArray').value
      }

      this.studentArray.push(studentObj);
        this.centralServ.studentData.next(this.studentArray);
      this.studentForm.reset();
              this.editModeDetail = false;
    }

    else{                      //Edit mode on

      let studentObj={
        enroll: this.editObjEnroll,
        name: this.studentForm.get('name').value,
        email: this.studentForm.get('email').value,
        ph: this.studentForm.get('ph').value,
        dob: this.studentForm.get('dob').value,
        gender: this.studentForm.get('gender').value,
        semester: this.studentForm.get('semester').value,
        subjectNum: this.studentForm.get('subjectNum').value,
        grade: this.grade,
        subject:this.studentForm.get('subjectArray').value
      }

      this.studentArray[this.editObjIndex]=studentObj;
        this.centralServ.studentData.next(this.studentArray);
      this.studentForm.reset();
      this.editObj=null;
              this.editModeDetail = false;

    }

    this.router.navigate(['listPage']);
    this.centralServ.studentCount.next(this.studentArray.length);


    // console.log(this.studentForm.controls['subjectArray'].controls['marks'].value);
  }


}
