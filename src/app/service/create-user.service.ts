import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(public firestore: AngularFirestore) {

  }

   validateCodes(code){
    return this.firestore.collection("codes", ref => ref.where('idBracelet','==',code)).snapshotChanges(); //dasd usuario sin acompañante   001 acompañante
    
   }

   updateCodes(recordID, record) {
    this.firestore.doc('codes/' + recordID).update(record);
  }

  createDataCodes(record){ // SIRVE PARA CREAR LA DATA DE LOS CODES
   return this.firestore.collection('codes').add(record);
  }

  createUser(record) {
    return this.firestore.collection('users').add(record);
  }

  getAllUser() {
    return this.firestore.collection('users').snapshotChanges();
  }
 
  searchUser(search) {
    return this.firestore.collection("users", ref => ref.where('idBracelet','==',search)).snapshotChanges(); //dasd usuario sin acompañante   001 acompañante
  }

  dummy() {
    return this.firestore.collection("users", ref => ref.where('idBracelet','==','1050')).snapshotChanges(); //dasd usuario sin acompañante   001 acompañante
  }

  getUserByUid(uid){
    return this.firestore.collection('users').doc(uid).get();
  }  

  updateUser(recordID, record) {
    this.firestore.doc('users/' + recordID).update(record);
  }

  deleteUser(record_id) {
    this.firestore.doc('users/' + record_id).delete();
  }

}
