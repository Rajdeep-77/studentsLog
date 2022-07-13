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
   }

  ngOnInit(){
    this.subscription = this.centerServ.studentCount.subscribe( count => { this.studentCount =count; });
  }
  subscription:Subscription;
  studentCount:number=0;

}
