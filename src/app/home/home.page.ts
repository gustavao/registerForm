import { Component, OnInit } from '@angular/core';
import { CreateUserService } from './../service/create-user.service';
import { ModalController, AlertController } from '@ionic/angular';
import { PartnerPage } from '../partner/partner.page';
import { ThanksPage } from '../thanks/thanks.page';
/*Faltantes --> revisar comentarios
Estilo
Validaciones
Envio de correos
*/
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  data = {
    name: '.',
    phone: '',
    email: '',
    birth: '',
    smoke: '',
    idBracelet: ''
  };

  validateCode=true;
  blockBracelet=false;
  //search: string;
  valid
  isEditUser:boolean=false;
  isEditPartner:boolean=false;
  //user: any;
  userName: string;
  userPhone: number;
  userEmail: string;
  userDateBirth: string;
  smoke: boolean = true;
  idBracelet: string;
  partner: boolean = false;
  partnerId: string;
  userId: string;


  constructor(public alertController: AlertController, private crudService: CreateUserService, public modalController: ModalController) { }

  ngOnInit() {
  }

  async presentAlert(x) {
    const alert = await this.alertController.create({
      header: 'Código de pulsera',
      subHeader: x,
      //message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
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

  createRecord() {
    let record = {};
    if (this.partner) {
      record['partnerId'] = this.partnerId;
    }
    record['type'] = "user";
    record['userName'] = this.userName;
    record['userPhone'] = this.userPhone;
    record['userEmail'] = this.userEmail;
    record['userDateBirth'] = this.userDateBirth;
    record['smoke'] = this.smoke;
    record['idBracelet'] = this.idBracelet;
    record['partner'] = this.partner;
    this.crudService.createUser(record).then(resp => {
      console.log("aah", resp);
      this.userId=resp.id;
      if (this.partner) {
        this.updatePartnerAddIdUser(this.partnerId,{userId:resp.id});
      }else{
        this.confirm();
      }
    })
      .catch(error => {
        console.log(error);
      });
  }

  async createPartner() {
    const modal = await this.modalController.create({
      component: PartnerPage
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data != null) {
        console.log("return", dataReturned);
        this.data.name = dataReturned.data.name;
        this.data.idBracelet = dataReturned.data.idBracelet;
        this.data.smoke = dataReturned.data.smoke;
        this.data.birth = dataReturned.data.birth;
        this.data.email = dataReturned.data.email;
        this.data.phone = dataReturned.data.phone;
        this.partnerId = dataReturned.data.partnerId;
        this.partner = dataReturned.data.onClosedData;
        this.createRecord();
      }
    });

    return await modal.present();
  }

  updatePartnerAddIdUser(partnerId,userId){ 
    this.crudService.updateUser(partnerId,userId); 
  }

  removeUser(){
    this.crudService.deleteUser(this.partnerId);
    this.crudService.deleteUser(this.userId);
    this.reset();
  }

  removePartner(){
    this.crudService.deleteUser(this.partnerId);
    this.crudService.updateUser(this.userId,{partner:false, partnerId:""});
  }

  editUser(){
    this.isEditUser = true;
  }

  editPartner(){
    this.isEditPartner = true;
  }

  updateUser(){
    this.crudService.updateUser(this.userId,{idBracelet:this.idBracelet,
                                             smoke:this.smoke,
                                             userDateBirth:this.userDateBirth,
                                             userEmail:this.userEmail,
                                             userName:this.userName,
                                             userPhone:this.userPhone});
    this.isEditUser = false;
  }

  updatePartner(){
    this.crudService.updateUser(this.partnerId,{idBracelet:this.data.idBracelet,
                                                smoke:this.data.smoke,
                                                userDateBirth:this.data.birth,
                                                userEmail:this.data.email,
                                                userName:this.data.name,
                                                userPhone:this.data.phone});
    this.isEditPartner = false;
  }

  reset(){
   this.partner = false;
   this.userName = "";
   this.userPhone = undefined;
   this.userEmail = "";
   this.userDateBirth = "";
   this.smoke = true;
   this.idBracelet = "";
   this.partnerId = "";
   this.userId = "";
   this.data.name='.';
   this.data.phone='';
   this.data.email='';
   this.data.birth='';
   this.data.smoke='';
   this.data.idBracelet='';
   this.validateCode=true;
   this.blockBracelet=false;
  }

  async confirm(){
    this.reset();
    //hacer el envio de correo a user y partner
    //enviar a pag de agradecimineto
    const modal = await this.modalController.create({
      component: ThanksPage
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== null) {
        console.log("return", dataReturned);
      }
    });

    return await modal.present();
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

    in(){//script que genera data de codes, loa activa boton en home actualmente esta de 001-099
      for(let i=100;i<401;i++){
      let data={
        idBracelet:i,   
        registered:false
      }
    this.crudService.createDataCodes(data).then(resp => {
      console.log("subii", resp);
      this.userId=resp.id;
    })
      .catch(error => {
        console.log(error);
      });
  }
}
} 