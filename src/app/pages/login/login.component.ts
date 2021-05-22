import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { UserProfile } from 'src/app/models/user-profile';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errorLogin: boolean = false;
  public error: string;
  private user: User;
  private userProfile: UserProfile;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private appComponent: AppComponent,
    private profileService: ProfileService
  ) { 
    if (sessionStorage.getItem("userData") != null) {
      this.loginService.logout();
      sessionStorage.clear();
      sessionStorage.clear;
      localStorage.clear();
      localStorage.clear;
      appComponent.createNavbar();
      window.location.reload();
    }
  }

  ngOnInit(): void { }

  login(localForm: NgForm) {
    this.errorLogin = false;
    var user = localForm.value.usuario;
    var password = localForm.value.contrasena;
    this.loginService.login(user, password).subscribe(
      reponse => {
        if (!reponse.ok) {
          this.loginService.logout();
        }
        this.user = Object.assign(new User(), reponse.body);
        this.profileService.getProfile(this.user.id + '').subscribe(
          reponse => {
            this.userProfile = Object.assign(new UserProfile(), reponse.body);
            this.crateItemsStorage();
          }
        );
      },
      err => {
        this.errorLogin = true;
      }
    );
  }

  crateItemsStorage() {
    var isTeacher = null;
    sessionStorage.setItem("userData", JSON.stringify(this.user));
    sessionStorage.setItem("loginInfo", "login");
    if (this.user.roles == "ROLE_TEACHER") isTeacher = true;
    else isTeacher = false;
    sessionStorage.setItem("role", isTeacher+"");
    sessionStorage.setItem("userName", this.userProfile.name);
    sessionStorage.setItem("program", this.userProfile.program);
    window.location.reload();
    this.router.navigate(['/home']);
  }
}
