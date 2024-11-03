import { Component } from '@angular/core';
//imports de material icons
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private phoneNumber: string = '542235999999';
  public whatsappLink: string = '';
  private instaUser: string ='quimey_dagos';
  public instagramLink: string = '';

  public base64Image: string = '';

  constructor() {
    this.generateWhatsAppLink();
    this.setInstagramLink('tu_usuario');
  }

  private generateWhatsAppLink(): void {
    this.whatsappLink = `https://wa.me/${this.phoneNumber}`;
  }



  setInstagramLink(username: string): void {
    this.instagramLink = `https://instagram.com/${this.instaUser}`;
  }
}
