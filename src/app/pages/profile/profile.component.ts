import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserProfile } from 'src/app/models/user-profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userProfile: UserProfile = new UserProfile;
  private userSession: User;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem("userData"));

    this.profileService.getProfile(this.userSession.id + '').subscribe(
      reponse => {
        this.userProfile = Object.assign(new UserProfile(), reponse.body);
      }
    );
  }

  onClick() {
    this.router.navigateByUrl("/home")
  }

}
