import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Poli Tutorías';
  userName: string = null;
  isHome: boolean;

  ngOnInit(): void {
    this.isHome = false;
    if (sessionStorage.getItem("userName") != null) {
      this.userName = sessionStorage.getItem("userName");
    } else {
      this.userName = null;
    }
  }

  createNavBar() {
    if (sessionStorage.getItem("userName") != null) {
      this.userName = sessionStorage.getItem("userName");
    } else {
      this.userName = null;
    }
  }

  setIsHome(ishome: boolean) {
    this.isHome = ishome;
  }
}