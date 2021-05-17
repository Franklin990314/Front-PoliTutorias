import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errorLogin: boolean = false;
  public error: string;
  private user: User;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("userData") != null) {
      this.loginService.logout();
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("userName");
      this.appComponent.createNavBar();
    }
    this.appComponent.setIsHome(false);
  }

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
        sessionStorage.setItem("userData", JSON.stringify(this.user));
        console.log(this.user);
        this.router.navigate(['/home']);
      },
      err => {
        this.errorLogin = true;
      }
    );
  }
}
