import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CentralServService } from '../central-serv.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {

  constructor(private centralServ:CentralServService) { }


  ngOnInit() {

    this.subscription = this.centralServ.studentData.subscribe(
      (arr) => { this.studentData= arr ;});
    this.DataArray = this.centralServ.getDetailList();
    this.centralServ.studentCount.next(this.studentData.length);
  }
  ngOnDestroy() {

  }
  tempVarDir:string;
  subscription:Subscription;
  searchByEnroll:number=null;
  searchByName:string='';
  searchByEmail:string='';
  searchByPhone:number=null;

  studentData:Array<any>=[];
  DataArray:Array<any>=[];
  // subscription:Subscription = this.centralServ.studentData.subscribe(
  //   (obj) => { this.studentData.push(obj);});

  // This function gives filters data according to user given Grade
  onFilterGrade(grade){
    if(grade=='All'){
      this.studentData = this.DataArray;
    }else{
      this.studentData = this.DataArray.filter( ob => { return ob.grade == grade; });
    }
  }

  // This function gives filters data according to user search on Enrollment
  searchEnroll(en){
    this.studentData = this.DataArray.filter( ob => { return ob.enroll == en; })
  }

  // This function gives filters data according to user search on Name
  searchName(){
    this.studentData = this.DataArray.filter( ob => { return ob.name == this.searchByName; })
  }

  // This function gives filters data according to user search on Email
  searchEmail(){
    this.studentData = this.DataArray.filter( ob => { return ob.email == this.searchByEmail; })
  }

  // This function gives filters data according to user search on Phone number
  searchPhone(){
    this.studentData = this.DataArray.filter( ob => { return ob.ph == this.searchByPhone; })
  }

  // This function deletes the data
  onEdit(data){
    console.log(data);
  }

  // This function deletes the data
  onDelete(data){
    console.log(data);
    this.studentData.splice(data,1);
  }

   // this function sorts the table rows based on ascending order of name column
   sortTable(n) {
    // this.arrayOfNum[n]=!this.arrayOfNum[n];

  var  rows, switching, tempVarX, tempVarY, shouldSwitch:boolean, switchcount:number = 0;
  switching = true;
  //Set the sorting direction to ascending:
  this.tempVarDir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = (<HTMLTableElement>document.getElementById("myTable")).rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (var i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      tempVarX = rows[i].getElementsByTagName("TD")[n];
      tempVarY = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (this.tempVarDir == "asc") {

        if (tempVarX.innerHTML.toLowerCase() > tempVarY.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (this.tempVarDir == "desc") {

        if (tempVarX.innerHTML.toLowerCase() < tempVarY.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && this.tempVarDir == "asc") {
        this.tempVarDir = "desc";
        switching = true;
      }
    }
  }
}

}
