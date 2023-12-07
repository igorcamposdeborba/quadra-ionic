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
    let isValid : boolean = this.validateRequiredLabels();

    if (isValid){
      this.loginService.login(this.userName, this.password).subscribe(
        response => {
          if (response.typeUser.toUpperCase() === 'ADMIN') {
            this.router.navigate(['/admin']);
          }
        }, error => {
          this.message = `${error.error.message}`;

          setTimeout(() => {
            this.message = '';
          }, 3000);
        }
      );
    } else {
      this.message = 'Preencha com o tamanho mínimo correto o usuário e senha.'
    }
  }

  validateRequiredLabels() : boolean {
    return this.userName.includes("@") && this.password.length > 5 ? true : false; 
  }
  
}
