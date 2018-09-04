import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { ArbolMenu } from '../interfaces/menu.interface';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private cmnSrvc: CommonService
  ) { }

  loadArbolMenu(): Observable<ArbolMenu> {
    const qName = 'Arbolmenu';
    const query = 'arbolMenu';
    return this.cmnSrvc.getQuery(qName, query, 'arbolMenu');
  }

}
