import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { presentAlert } from '../../utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [UsuarioService, LocalStorageService]
})
export class LoginPage implements OnInit {

  usuario: String = null;
  contrasenia: String = null;

  constructor(
    private usuarioSrvc: UsuarioService,
    private localStorageSrvc: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.usuarioSrvc.login(this.usuario, this.contrasenia).subscribe(async (data) => {
      if (data.logeado) {
        this.localStorageSrvc.set('rtusr', data);
        this.router.navigate(['home']);
      } else {
        await presentAlert({
          header: 'Error',
          subHeader: 'Usuario/Contraseña no válido.',
          message: 'El usuario o la contraseña utilizados no son válidos. Por favor pruebe de nuevo.',
          buttons: [{
            text: 'Aceptar',
            handler: () => {
              this.usuario = null;
              this.contrasenia = null;
            }
          }]
        });
      }
    });
  }

}
