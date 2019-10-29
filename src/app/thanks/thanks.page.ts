import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.page.html',
  styleUrls: ['./thanks.page.scss'],
})
export class ThanksPage implements OnInit {

  
  endpoint = 'https://us-central1-piknik-iqos.cloudfunctions.net/httpEmail';


  constructor(public navParams: NavParams, private http: HttpClient, private modalController: ModalController) { }
  

  ngOnInit() {
 
  }

  sendEmail() {
    const something: string = this.navParams.get('something');
    console.log("se enviara a:",something)
    const data = {
      toEmail: something,
      toName: 'Jeff Delaney'
    }

    this.http.post(this.endpoint, data).subscribe()
  }

  

  
  async closeThanks(){
    this.sendEmail();
    let data = {
      
    };
    await this.modalController.dismiss(data);
   
  }

}