import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourtService } from 'src/app/model/court/court.service';
import { CourtInterface } from 'src/app/model/court/courtInterface';
import { CourtDataBackup } from 'src/app/config/backup.config';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  ELEMENT_DATA: CourtInterface[] = [];

  utmId : string = "";

  constructor(private route: ActivatedRoute, private courtService : CourtService, private ELEMENT_DATA_BACKUP : CourtDataBackup) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => { // pegar id da URL pelo parâmetro de UTM
      this.utmId = params['utm_id'];
      this.findById(this.utmId);
    });
  }

  findById(utmId : string) : void {
    this.courtService.findById(utmId).subscribe( response => {
      this.ELEMENT_DATA = Array.isArray(response) ? response : [response];
    }, error => {
      this.ELEMENT_DATA = this.ELEMENT_DATA_BACKUP.getBackupData();
    });
  }

  formatDate(data: string): string {
    const day = (data.slice(8, 10));
    const month = ((data.slice(5, 7)));
    const year = data.slice(0, 4).toString();
    const hour = (data.slice(11, 13));
    const minutes = (data.slice(14, 16));
  
    return `${day}/${month}/${year} - ${hour}:${minutes}`;
  }
}
