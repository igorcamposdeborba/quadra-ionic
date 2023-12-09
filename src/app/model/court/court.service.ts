import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourtInterface } from './courtInterface';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CourtService {

  public idUserLogged : number = -1;
  public userLogged : any = null; // atributo para validação temporária com os dados do usuário logado


  constructor(private http: HttpClient) {}

  findAll(): Observable<CourtInterface[]>{
    return this.http.get<CourtInterface[]>(`${API_CONFIG.baseUrl}/admin`);
  }

  findById(id : string): Observable<CourtInterface>{
    return this.http.get<CourtInterface>(`${API_CONFIG.baseUrl}/schedule?utm_id=${id}`);
  }
}
