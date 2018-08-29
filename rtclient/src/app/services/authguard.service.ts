import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalStorageService } from './localstorage.service';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  private usrlogin: Login = null;

  constructor(public router: Router, private localStorageSrvc: LocalStorageService) { }

  canActivate(): boolean {
    this.usrlogin = this.localStorageSrvc.get('rtusr');
    if (this.usrlogin) {
      if (this.usrlogin.logeado) {
        return true;
      }
    }
    this.router.navigate(['login']);
    return false;
  }

}
