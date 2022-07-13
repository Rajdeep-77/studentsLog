import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CentralServService } from '../central-serv.service';

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

  studentData:Array<any>=[];
  DataArray:Array<any>=[];
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
  onEdit(dataIndex, objectToEdit){
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

}
