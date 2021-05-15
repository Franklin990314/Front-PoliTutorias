import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    private loginService: LoginService
  ) { }

  async ngOnInit() {

  }

  login(localForm: NgForm) {
    this.errorLogin = false;
    var user = localForm.value.usuario;
    var password = localForm.value.contrasena;
    this.loginService.login(user, password).subscribe(
      reponse => {
        console.log(reponse.ok);
        if (!reponse.ok) {
          this.loginService.logout();
        }
        this.user = Object.assign(new User(), reponse.body);
        this.router.navigate(['/home', {id: this.user.id}]);
      },
      err => {
        console.log("ksdjfhskdjh");
        this.errorLogin = true;
      }
    );
    console.log(user);
    console.log(password);
  }
}
