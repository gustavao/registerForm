import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController  } from '@ionic/angular';
import { CreateUserService } from './../service/create-user.service';
/*Faltantes --> revisar comentarios
Validaciones
*/
@Component({
  selector: 'app-partner',
  templateUrl: './partner.page.html',
  styleUrls: ['./partner.page.scss'],
})
export class PartnerPage implements OnInit {

  partnerName: string;
  partnerPhone: number;
  partnerEmail: string;
  partnerDateBirth: string;
  partnerSmoke: boolean = true;
  partnerId: string;
  idBracelet: string;
  validateCode=true;
  blockBracelet=false;
  valid

  constructor(private crudService: CreateUserService, public alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {}

  async presentAlert(x) {
    const alert = await this.alertController.create({
      header: 'Código de pulsera',
      subHeader: x,
      //message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  validate(e:any){
    if (e.target.value.length==3) {
      this.blockBracelet=true;
      //busqueda
      this.validCode(e.target.value);
      let TIME_IN_MS = 1000;
      let hideFooterTimeout = setTimeout( () => {
        console.log("hey hola heey",this.valid);
        if(!this.valid){
          this.idBracelet=e.target.value; //despues de validacion de code
          this.blockBracelet=true;
          this.validateCode=false;
        }else{
          this.idBracelet='';
          this.blockBracelet=false;
        }
      }, TIME_IN_MS);
      
      
      }else{
        if (e.target.value.length>3) {
          this.idBracelet='';
        }
      }
    }

  validCode(bracelet){
    let ret;
    this.crudService.validateCodes(bracelet).subscribe(data => {

      if(data[0].payload.doc.data()['registered']==false){
        console.log("codigo valido");
        this.presentAlert('valido');
        this.valid=false;
      }else{
        console.log("codigo invalido");
        this.presentAlert('invalido');
        this.valid=true;
      }
      
      console.log("axulio me desmayo false=valido   true=invalido", data[0].payload.doc.data()['registered']);
      ret=data[0].payload.doc.data()['registered'];
      

    });
    return ret
  }

  CreateRecord() {
    let record = {};
    record['type'] = "invited";
    record['userName'] = this.partnerName;
    record['userPhone'] = this.partnerPhone;
    record['userEmail'] = this.partnerEmail;
    record['userDateBirth'] = this.partnerDateBirth;
    record['smoke'] = this.partnerSmoke;
    record['idBracelet'] = this.idBracelet;
    this.crudService.createUser(record).then(resp => {
      this.partnerId = resp.id;
      this.closeAfterCreate();
      this.partnerName = "";
      this.partnerPhone = undefined;
      this.partnerEmail = "";
      this.partnerDateBirth = "";
      this.partnerSmoke = false;
      this.idBracelet = "";
      
      
      console.log("ahhh:)", resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  closeModal() {
    this.modalController.dismiss(null);
  }

  addPartner() {
    this.CreateRecord();
  }

  async closeAfterCreate() {
    let data = {
      partnerId: this.partnerId,
      name: this.partnerName,
      phone: this.partnerPhone,
      email: this.partnerEmail,
      birth: this.partnerDateBirth,
      smoke: this.partnerSmoke,
      idBracelet: this.idBracelet,
      onClosedData: true
    };
    await this.modalController.dismiss(data);
  }

}
