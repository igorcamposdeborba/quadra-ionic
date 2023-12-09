import { Injectable } from '@angular/core';
import { CourtInterface } from '../model/court/courtInterface';

@Injectable({
  providedIn: 'root',
})
export class CourtDataBackup {
  ELEMENT_DATA_BACKUP: CourtInterface[] = [
    {
      id: '1',
      typeCourt: 'Futebol 1',
      tax: 100.0,
      schedule: [
        {
          id: '1',
          effectiveFrom: new Date().toString(),
          effectiveTo: new Date(new Date().getTime() + 60 * 60 * 1000).toString(),
          isFree: false,
        },
      ],
    },
    {
      id: '2',
      typeCourt: 'Tênis 1',
      tax: 100.0,
      schedule: [
        {
          id: '1',
          effectiveFrom: new Date(new Date().getTime() + 60 * 60 * 1000).toString(),
          effectiveTo: new Date(new Date().getTime() + 60 * 60 * 2000).toString(),
          isFree: false,
        },
      ],
    },
  ];

  constructor() {}

  getBackupData(): CourtInterface[] {
    return this.ELEMENT_DATA_BACKUP;
  }
}