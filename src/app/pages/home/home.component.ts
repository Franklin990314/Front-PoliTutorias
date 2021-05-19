import { Component, OnInit } from '@angular/core';
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
  private userSession: User;
  public userProfile: UserProfile

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.userSession = JSON.parse( sessionStorage.getItem("userData") );
    this.appComponent.setIsHome(true);

    if (sessionStorage.getItem("userName") == null) {
      this.profileService.getProfile(this.userSession.id+'').subscribe(
        reponse => {
          this.userProfile = Object.assign(new UserProfile(), reponse.body);
          sessionStorage.setItem("userName",this.userProfile.name);
          this.appComponent.createNavBar();
        }
      );
    }
  }

  schedule(): void {
    this.router.navigateByUrl("/schedule");
  }
}
