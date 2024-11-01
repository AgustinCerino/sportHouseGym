import { Component } from '@angular/core';
import { VerPerfilComponent } from "./ver-perfil/ver-perfil.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [VerPerfilComponent, RouterModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

}
