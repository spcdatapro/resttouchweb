import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private cmnSrvc: CommonService) {}

  login(usuario: String, contrasenia: String): Observable<Login> {
    const qName = 'Login($usr: String!, $pwd: String!)';
    const query = `
      login(usr: $usr, pwd: $pwd){
        _id
        nombre
        apellido
        usuario
        token
        logeado
      }
    `;
    return this.cmnSrvc.getQuery(qName, query, 'login', { usr: usuario, pwd: contrasenia });
  }


}
