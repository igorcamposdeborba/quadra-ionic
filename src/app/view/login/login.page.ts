import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/model/login.service';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public userName : any = null;
  public password : any = null;
  public message : any = null;

  constructor(private loginService : LoginService, private router: Router) {}

  sendForm(): void {
    let isValid: boolean = this.validateRequiredLabels();
  
    if (isValid) {
      this.loginService.login(this.userName, this.password).subscribe(
        response => {
          if (response.typeUser.toUpperCase() === 'ADMIN') {
            LocalNotifications.schedule({
              notifications: [
                {
                  title: 'Logado',
                  body: response + ' logado',
                  id: 1,
                  schedule: { at: new Date(Date.now()) }
                }
              ]
            });
            this.router.navigate(['/admin']);
          }
        }, error => {
          if (error.status === 0) { // checar erro de conexão com o back-end
            // Backup de login
            const errorLogin = {
              id: 1,
              name: 'Error User',
              email: 'error@example.com',
              password: 'errorPassword',
              typeUser: 'ERROR'
            };
  
            LocalNotifications.schedule({
              notifications: [
                {
                  title: 'Erro de Conexão',
                  body: 'Houve um erro de conexão. Usando credenciais de erro.',
                  id: 2,
                  schedule: { at: new Date(Date.now()) }
                }
              ]
            });
          } else {
            this.message = `${error.error.message}`;
            setTimeout(() => {
              this.message = '';
            }, 3000);
          }
        }
      );
    } else {
      this.message = 'Preencha com o tamanho mínimo correto o usuário e senha.';
    }
  }

  validateRequiredLabels() : boolean {
    return this.userName != null && this.userName.includes("@") && this.password.length > 5 ? true : false; 
  }

  isUnfilled(): boolean {
    let isDisabled = false;
    if (this.userName == "" || this.password == "") {
      isDisabled = true;
    }
    return isDisabled;
  }
  
}


