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
          // backup do login em caso do banco de dado estar fora do ar
          const errorLogin = {
            id: 1,
            name: 'Igor',
            email: 'admin@hotmail.com',
            password: '123456',
            typeUser: 'ADMIN'
          };
  
          LocalNotifications.schedule({
            notifications: [
              {
                title: 'Erro de Conexão',
                body: 'Houve um erro de conexão. Usando credenciais específicas.',
                id: 2,
                schedule: { at: new Date(Date.now()) }
              }
            ]
          });
          this.handleLogin(errorLogin); // backup do login em caso do banco de dado estar fora do ar
        }
      );
    } else {
      this.message = 'Preencha com o tamanho mínimo correto o usuário e senha.';
    }
  }
  
  // Método para manipular o login
  private handleLogin(user: any): void {
    if (user.typeUser.toUpperCase() === 'ADMIN') {
      this.router.navigate(['/admin']);
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


