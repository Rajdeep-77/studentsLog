import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

export interface dataObject{
  enroll: number,
  name: string,
  email: string,
  region: string,
  ph: number,
  dob: string,
  gender: string,
  semester: number,
  subjectNum:number,
  grade: string,
  subject: Array<object>
}

@Injectable({
  providedIn: 'root'
})
export class CentralServService {

  constructor() { }

  studentData = new BehaviorSubject<any>([]);
  studentCount = new BehaviorSubject<any>(0);
  editMode = new BehaviorSubject<any>(false);
  // editObjCentral = new BehaviorSubject<any>(null);
  editObj = new BehaviorSubject<any>(null);

  // arrayList:Array<any>;

  // setArrayList(arr){ this.arrayList=arr;}
  // getArrayList(){ return this.arrayList;}

  studentDetail:Array<any>=[];
  subscription:Subscription = this.studentData.subscribe(
    (arr) => { this.studentDetail= arr ;});

    // This function returns the detail array
    getDetailList(){
      return this.studentDetail;
    }
}
