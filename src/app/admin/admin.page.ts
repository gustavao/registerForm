import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
/*Faltantes --> revisar comentarios
Cambio(olvido) de contraseña
*/
export class User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public user: User = new User();

  constructor(private navCtrl: NavController, private authService: AuthenticationService) { }

  ngOnInit() {

  }

  loginUser() {
    this.authService.loginUser(this.user)
      .then(res => {
        this.navCtrl.navigateForward('/administration');
        this.user.email = "";
        this.user.password = "";
      }, err => {
        this.user.email = "";
        this.user.password = "";
      })
  }


}
