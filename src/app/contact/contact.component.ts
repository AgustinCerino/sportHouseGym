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
  public base64Image: string = '';

  constructor() {
    this.generateWhatsAppLink();
  }

  private generateWhatsAppLink(): void {
    this.whatsappLink = `https://wa.me/${this.phoneNumber}`;
  }
}
