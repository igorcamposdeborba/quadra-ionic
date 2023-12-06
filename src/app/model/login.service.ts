import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { LoginUserInterface } from './loginUserInterface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public idUserLogged : number = -1;
  public userLogged : any = null; // atributo para validação temporária com os dados do usuário logado


  private backendUrl = "http://localhost:8080"

  constructor(private http: HttpClient, private router: Router) {}

  login(email : string, password : string) : Observable<LoginUserInterface> {
    const body = { email, password };
    let response : any = this.http.post(`${this.backendUrl}/login`, body); // resgatar usuário do banco de dados
    
    // Salvar dados do usuário
    if (response.userName === email && response.password === password) {
      this.idUserLogged = response.id;
      this.userLogged = response; // guardar temporariamente o usuário logado, por meio de objeto usuário com login e senha iguais aos do array comparado com os que foi fornecido por parâmetro
    }
    return response; // retornar usuário ou mensagem de erro contidos na response da requisição
  }

  logout() : void{
    this.router.navigate(['/login']);
  }
}
