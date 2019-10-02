import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.page.html',
  styleUrls: ['./thanks.page.scss'],
})
export class ThanksPage implements OnInit {
  
  endpoint = 'https://us-central1-piknik-iqos.cloudfunctions.net/httpEmail';


  constructor(private http: HttpClient, private modalController: ModalController) { }
  

  ngOnInit() {
 
  }

  sendEmail() {
    const data = {
      toEmail: 'elg.gespindola@gmail.com',
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