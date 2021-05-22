import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { UserProfile } from 'src/app/models/user-profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userId: number;
  public userProfile: UserProfile;
  public isTeacher: boolean = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appComponent: AppComponent
  ) {
    this.isTeacher = (sessionStorage.getItem("role") == "true");
    this.reloadPage();
  }

  reloadPage(): void {
    if (!this.appComponent.getIsHome()) window.location.reload();
  }

  ngOnInit(): void { }

  schedule(): void {
    this.router.navigateByUrl("/schedule");
  }

  petition(): void {
    this.router.navigateByUrl("/petition");
  }
}
