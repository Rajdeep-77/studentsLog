import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CentralServService } from '../central-serv.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private centerServ:CentralServService) {
   this.subscription = centerServ.studentCount.subscribe( count => { this.studentCount =count; })
   }

  ngOnInit(){
  }
  subscription:Subscription;
  studentCount:number=0;

}
