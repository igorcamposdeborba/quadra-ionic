import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginUserInterface } from './loginUserInterface';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject = new BehaviorSubject<LoginUserInterface | null>(null); // Para verificar usuário logado: observable (contexto) mantém dados entre componentes do usuário

  public userLogged: LoginUserInterface | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginUserInterface> {
    const body = { email, password };
    
    return this.http.post<LoginUserInterface>(`${API_CONFIG.baseUrl}/login`, body)
      .pipe(
        tap(user => {
          this.userLogged = user; // Salvar dados do usuário logado
          this.userSubject.next(user);
        })
      );
  }

  logout(): void {
    this.userSubject.next(null); // deslogar do observable de context
    this.userLogged = null;
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return this.userSubject.getValue() !== null;
  }
}
