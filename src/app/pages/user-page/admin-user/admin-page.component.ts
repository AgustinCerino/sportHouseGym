import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsuariosAbmComponent } from "../usuarios-abm/usuarios-abm.component";
import { RutinasAbmComponent } from "../rutinas-abm/rutinas-abm.component";



@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UsuariosAbmComponent, RutinasAbmComponent],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  mostrarUsuarios: boolean = false;
  mostrarRutinas: boolean = false;

}


