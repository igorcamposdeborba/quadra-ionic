import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourtDataBackup } from 'src/app/config/backup.config';
import { CourtService } from 'src/app/model/court/court.service';
import { CourtInterface } from 'src/app/model/court/courtInterface';
import { LoginService } from 'src/app/model/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  ELEMENT_DATA: CourtInterface[] = [];
  /*ELEMENT_DATA: CourtInterface[] = [
    {
      id: "1",
      typeCourt: "Futebol 1",
      tax: 100.0,
      schedule: [
        {
          id: "1",
          effectiveFrom: new Date(),
          effectiveTo: new Date(new Date().getTime() + 60 * 60 * 1000),
          isFree: false
        }
      ]
    },
    {
      id: "2",
      typeCourt: "Tênis 1",
      tax: 100.0,
      schedule: [
        {
          id: "1",
          effectiveFrom: new Date(),
          effectiveTo: new Date(new Date().getTime() + 60 * 60 * 1000),
          isFree: false
        }
      ]
    },
  ];*/

  filteredData: CourtInterface[] = this.ELEMENT_DATA; // Armazena os itens filtrados na busca

  constructor(private courtService : CourtService, private loginService : LoginService, private router: Router, private ELEMENT_DATA_BACKUP : CourtDataBackup) { }

  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.courtService.findAll().subscribe(response => {
      this.ELEMENT_DATA = response; // salvar entity do banco de dados
      this.filteredData = this.ELEMENT_DATA;
    }, error => {
      this.ELEMENT_DATA = this.ELEMENT_DATA_BACKUP.getBackupData();
      this.filteredData = this.ELEMENT_DATA_BACKUP.getBackupData();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Filtra os itens com base no valor inserido na busca
    this.filteredData = [];
    this.filteredData = this.ELEMENT_DATA.filter(item =>
      item.typeCourt.toLowerCase().includes(filterValue)
    );
  }

  navigateToSchedule(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/schedule'], { queryParams: { utm_id: id } });
    }
  }

  logout(){
    this.loginService.logout();
  }

  trackItems(index: number, itemObject: any) { // boa prática para mostrar na tabela corretamente pelo id
    return itemObject.id;
  }
}