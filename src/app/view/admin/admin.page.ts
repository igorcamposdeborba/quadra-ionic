import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/model/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  constructor(private loginService : LoginService) { }

  logout(){
    this.loginService.logout();
  }
}
