import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/model/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public userName : string = "";
  public password : string = "";
  public message : string = "";

  constructor(private loginService : LoginService, private router: Router) {}

  sendForm() : void {
    this.loginService.login(this.userName, this.password).subscribe(
      response => {
        if (response.typeUser.toUpperCase() === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.message = 'Acesso negado';
        }
      }
    );
  }
  
}
