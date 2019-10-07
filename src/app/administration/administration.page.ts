import { Component, OnInit } from '@angular/core';
import { CreateUserService } from './../service/create-user.service';
import { AuthenticationService } from '../authentication.service';
import { NavController } from '@ionic/angular';
/*Faltantes --> revisar comentarios
Cambio de contraseña 
Añadir mas administradores
Descargar Db en csv
*/
@Component({
  selector: 'app-administration',
  templateUrl: './administration.page.html',
  styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

  user: any;
  userEmail: string;
  search: string;
  card2=false;
  newVal;
  btnSearch:boolean=true;
  btn:boolean=true;

  user2 = {
    userName: '.',
    userPhone: '',
    userEmail: '',
    userDateBirth: '',
    smoke: '',
    idBracelet: '',
    type:'',
    id:'',
    isEdit: false
  };

  

  constructor(private navCtrl: NavController, private crudService: CreateUserService, private authService: AuthenticationService) { }

  ngOnInit() {
    console.log("asdasd",typeof(this.user))

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      //this.viewInfo();
      
    } else {
      this.navCtrl.navigateBack('/admin');
    }
//this.searchById("001");
  }

  viewInfo() {   //GetAllUser
    this.crudService.getAllUser().subscribe(data => {
      this.user = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          userName: e.payload.doc.data()['userName'],
          userPhone: e.payload.doc.data()['userPhone'],
          userEmail: e.payload.doc.data()['userEmail'],
          userDateBirth: e.payload.doc.data()['userDateBirth'],
          smoke: e.payload.doc.data()['smoke'],
          idBracelet: e.payload.doc.data()['idBracelet']
        };
      })
      console.log("collection User", this.user);

    });
  }

  RemoveRecord(rowID) {
    this.crudService.deleteUser(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EdituserName = record.userName;
    record.EdituserPhone = record.userPhone;
    record.EdituserEmail = record.userEmail;
    record.EdituserDateBirth = record.userDateBirth;
    record.Editsmoke = record.smoke;
    record.EditidBracelet = record.idBracelet;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['userName'] = recordRow.EdituserName;
    record['userPhone'] = recordRow.EdituserPhone;
    record['userEmail'] = recordRow.EdituserEmail;
    record['userDateBirth'] = recordRow.EdituserDateBirth;
    record['smoke'] = recordRow.Editsmoke;
    record['idBracelet'] = recordRow.EditidBracelet;
    this.crudService.updateUser(recordRow.id, record);
    recordRow.isEdit = false;
  }

  UpdateRecord2(recordRow) {
    let record = {};
    record['userName'] = recordRow.userName;
    record['userPhone'] = recordRow.userPhone;
    record['userEmail'] = recordRow.userEmail;
    record['userDateBirth'] = recordRow.userDateBirth;
    record['smoke'] = recordRow.smoke;
    record['idBracelet'] = recordRow.idBracelet;
    this.crudService.updateUser(recordRow.id, record);
    recordRow.isEdit = false;
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        this.navCtrl.navigateBack('/admin');
      })
      .catch(error => {
      })
  }

  validate(e:any){
    if (e.target.value.length==3) {
      this.btnSearch=false;
      this.search=e.target.value;
      }else{
        this.btnSearch=true;
        if (e.target.value.length>3) {
          this.search='';
        }
      }
    }

    searchById(){
      
    this.crudService.searchUser(this.search).subscribe(data => {
      this.user = data.map(e => {
        
        if( e.payload.doc.data()['type'] == "invited" ){
          //aqui llamar a user
          this.crudService.getUserByUid(e.payload.doc.data()['userId']).subscribe(x=>{
            console.log("nooo",x.data()['userName']);
            this.user2.userName=x.data()['userName'];
            this.user2.idBracelet=x.data()['idBracelet'];
            this.user2.userEmail=x.data()['userEmail'];
            this.user2.userDateBirth=x.data()['userDateBirth'];
            this.user2.id=x.id;
            this.user2.type=x.data()['type'];
            this.user2.smoke=x.data()['smoke'];
            this.user2.userPhone=x.data()['userPhone'];
            });
            //-------------
          this.card2=true;
        return {
          id: e.payload.doc.id,
          isEdit: false,
          userName: e.payload.doc.data()['userName'],
          userPhone: e.payload.doc.data()['userPhone'],
          userEmail: e.payload.doc.data()['userEmail'],
          userDateBirth: e.payload.doc.data()['userDateBirth'],
          smoke: e.payload.doc.data()['smoke'],
          idBracelet: e.payload.doc.data()['idBracelet'],
          userId: e.payload.doc.data()['userId'],
          type: e.payload.doc.data()['type']
        };
      }else{
          if( e.payload.doc.data()['partner'] == true ){
            //-----------aqui llamar a partner
            this.crudService.getUserByUid(e.payload.doc.data()['partnerId']).subscribe(x=>{
              console.log("nooo",x.data()['userName']);
              this.user2.userName=x.data()['userName'];
              this.user2.idBracelet=x.data()['idBracelet'];
              this.user2.userEmail=x.data()['userEmail'];
              this.user2.userDateBirth=x.data()['userDateBirth'];
              this.user2.id=x.id;
              this.user2.type=x.data()['type'];
              this.user2.smoke=x.data()['smoke'];
              this.user2.userPhone=x.data()['userPhone'];
              });
            //----------
            this.card2=true;
            return {
              id: e.payload.doc.id,
              isEdit: false,
              userName: e.payload.doc.data()['userName'],
              userPhone: e.payload.doc.data()['userPhone'],
              userEmail: e.payload.doc.data()['userEmail'],
              userDateBirth: e.payload.doc.data()['userDateBirth'],
              smoke: e.payload.doc.data()['smoke'],
              idBracelet: e.payload.doc.data()['idBracelet'],
              partnerId: e.payload.doc.data()['partnerId'],
              type: e.payload.doc.data()['type']
            };
          }else{
            this.card2=false;
            return {
              id: e.payload.doc.id,
              isEdit: false,
              userName: e.payload.doc.data()['userName'],
              userPhone: e.payload.doc.data()['userPhone'],
              userEmail: e.payload.doc.data()['userEmail'],
              userDateBirth: e.payload.doc.data()['userDateBirth'],
              smoke: e.payload.doc.data()['smoke'],
              idBracelet: e.payload.doc.data()['idBracelet'],
              userId: e.payload.doc.data()['userId'],
              type: e.payload.doc.data()['type']
            };
          }

          
      }

      })


      console.log("collection User", this.user);
      if(this.user.length!=0){
        console.log("entre");
        this.btn=false;
      }
      this.search='';
      this.btnSearch=true;
    });
   
    
  }

  reset(){
    this.btn=true;
    this.card2=false;
    this.user=undefined;
    this.user2.userName= '.';
    this.user2.userPhone= '';
    this.user2.userEmail= '';
    this.user2.userDateBirth= '';
    this.user2.smoke= '';
    this.user2.idBracelet= '';
    this.user2.type='';
    this.user2.id='';
    this.user2.isEdit= false;
   }

   

}


