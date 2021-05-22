import { Component, OnInit } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Poli Tutorías';
  public userName: string = null;
  public isHome: boolean = false;
  public isTeacher: boolean = null;

  constructor() {
    this.createNavbar();
  }

  ngOnInit(): void { }

  createNavbar() {
    if (sessionStorage.getItem("userData") != null) {
      this.isTeacher = (sessionStorage.getItem("role") == "true");
      this.isHome = true;
    }
    if (sessionStorage.getItem("userName") != null) {
      this.userName = sessionStorage.getItem("userName");
    } else {
      this.userName = null;
    }
  }

  setIsHome(ishome: boolean) {
    this.isHome = ishome;
  }

  getIsHome(): boolean {
    return this.isHome;
  }
}