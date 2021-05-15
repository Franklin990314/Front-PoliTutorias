import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user-profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userId: number;
  public userProfile: UserProfile

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
        // Defaults to 0 if no query param provided.
        this.userId = parseInt(params.get('id'));
        console.log(this.userId);
      });
    
      this.profileService.getProfile(this.userId+'').subscribe(
        reponse => {
          reponse.headers;
          console.log(reponse.headers);
          console.log(reponse.body);
        },
        err => {
          
        }
      );
  }

}
