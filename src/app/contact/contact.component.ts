import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/users.interface';
import { UsuarioService } from '../services/usuario.service';
import { CommonModule } from '@angular/common';

//imports de material icons
@Component({
  selector: 'app-contact',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private phoneNumber: string = '542235999999';
  public whatsappLink: string = '';
  private instaUser: string ='sporthousegym.mdp';
  public instagramLink: string = '';
  public usuario !:Usuario
  public base64Image: string = '';
  srv = inject(UsuarioService);

  ngOnInit(): void {
    this.usuario=this.srv.getUsuarioActual()!;
  }

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
