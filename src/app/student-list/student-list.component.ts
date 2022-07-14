import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CentralServService, dataObject } from '../central-serv.service';
import { OrderAscDescPipe } from '../order-asc-desc.pipe';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {

  constructor(
    private centralServ:CentralServService, private router:Router) { }


  ngOnInit() {

    this.subscription = this.centralServ.studentData.subscribe(
      (arr) => { this.studentData= arr ;});

     this.DataArray = this.centralServ.getDetailList();
    }

  ngOnDestroy() {
    this.centralServ.editMode.next(this.editModeList);

  }

  tempVarDir:string;
  editModeList:boolean=false;

  subscription:Subscription;

  searchBy:any;

  studentData:Array<dataObject>=[];
  DataArray:Array<dataObject>=[];
  arrayOfNum=[true,true,true,true];

  // This function gives filters data according to user given Grade
  onFilterGrade(grade){
    // if(grade=='All'){
    //   this.studentData = this.DataArray;
    // }
    // else{
    //   this.studentData = this.DataArray.filter( ob => { return ob.grade == grade; });
    // }
     grade === 'All' ? (this.studentData = this.DataArray) : (this.studentData = this.DataArray.filter( ob => { return ob.grade == grade; }));
  }


  // This function deletes the data
  onEdit( objectToEdit){
    // console.log(dataIndex);
      this.editModeList=true;
        // this.centralServ.editMode.next(this.editModeList);
    // this.centralServ.editObjCentral.next(dataIndex);
    this.centralServ.editObj.next(objectToEdit);
    this.router.navigate(['']);
  }

  // This function deletes the data
  onDelete(data){
    // console.log(data);
    this.studentData.splice(data,1);
    this.centralServ.studentCount.next(this.studentData.length);

  }

  direction:string="asc";
column:string="first";
type:string="string";

  setSortParams(param, dir){
    this.direction=param.dir;
    this.column=param.col;
    this.type=param.typ;

    const customPipe = new OrderAscDescPipe();
    this.studentData = customPipe.transform(this.studentData,dir,param);
    }

   // this function sorts the table rows based on ascending order of name column
   sortTable(n) {
    if(n==1){
      this.arrayOfNum[0]=!this.arrayOfNum[0];
    }
    else if(n==2){
      this.arrayOfNum[1]=!this.arrayOfNum[1];
    }
    else if(n==6){
      this.arrayOfNum[2]=!this.arrayOfNum[2];
    }
    else if(n==7){
      this.arrayOfNum[3]=!this.arrayOfNum[3];
    }


  var  rows, switching, tempVarX, tempVarY, shouldSwitch:boolean, switchcount:number = 0;
  switching = true;
  this.tempVarDir = "asc";
  while (switching) {
    switching = false;
    rows = (<HTMLTableElement>document.getElementById("myTable")).rows;
    for (var i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      tempVarX = rows[i].getElementsByTagName("TD")[n];
      tempVarY = rows[i + 1].getElementsByTagName("TD")[n];
      if (this.tempVarDir == "asc") {

        if (tempVarX.innerHTML.toLowerCase() > tempVarY.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (this.tempVarDir == "desc") {

        if (tempVarX.innerHTML.toLowerCase() < tempVarY.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    }
    else {
      if (switchcount == 0 && this.tempVarDir == "asc") {
        this.tempVarDir = "desc";
        switching = true;
      }
    }
  }
  }

  // sortTable( objProp ){

    // objProp == 'name' ? (this.isDesc = !this.isDesc,direction = this.isDesc ? 1 : -1) : (property == 'email' ? (this.Email = !this.Email, direction = this.Email ? 1 : -1) :  (property == 'semester' ? (this.Semester = !this.Semester, direction = this.Semester ? 1 : -1) : (this.Grade = !this.Grade, direction = this.Grade ? 1 : -1)));

    // let sortBy = (arr, prop, dir) => [...arr].sort((a,b) => a[prop].localeCompare(b[prop]) * dir);

    // this.displayArr.sort(function (a, b) {
    //   if (a[property] < b[property]) {
    //     return -1 * direction;
    //   }
    //   else if (a[property] > b[property]) {
    //     return 1 * direction;
    //   }
    //   else {
    //     return 0;
    //   }
  // }

}
