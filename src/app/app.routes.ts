
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
//imports perfil
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { VerPerfilComponent } from './pages/profile-page/ver-perfil/ver-perfil.component';
import { ModificarUsuarioComponent } from './pages/profile-page/modificar-usuario/modificar-usuario.component';
// import login
import { LogPageComponent } from './pages/log-page/log-page.component';
import { RegisterComponent } from './pages/log-page/register/register.component';
import { LoginComponent } from './pages/log-page/login/login.component';
// import rutinas
import { RoutineListComponent } from './pages/routine-page/routine-list/routine-list.component';
import { RoutineDetailsComponent } from './pages/routine-page/routine-details/routine-details.component';
import { RoutinePageComponent } from './pages/routine-page/routine-page.component';
// import users
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AdminPageComponent } from './pages/user-page/admin-user/admin-page.component';
import { BasicPageComponent } from './pages/user-page/basic-user/basic-page.component';
import { PremiumPageComponent } from './pages/user-page/premium-user/premium-page.component';
import { CalendarComponent } from './pages/user-page/calendar/calendar.component';

import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  ///Rutas de perfil
      { path: 'profile', component: ProfilePageComponent, children: [
        { path: '', component: VerPerfilComponent },
        { path: 'modify-user/:id', component: ModificarUsuarioComponent}
      ]},
  /// Rutas de logeo
      {path: 'log',component: LogPageComponent, children:[
        {path:'',component: LoginComponent},
        {path:'register',component: RegisterComponent}
      ]},
  /// Rutas de Rutinas
      {path:'routines',component:RoutinePageComponent, children :[
        { path: '',component: RoutineListComponent},
        { path: 'details/:id',component:RoutineDetailsComponent}
      ]},
  /// Rutas de Usuarios
      {path:'user',component: UserPageComponent, children :[
        {path:'admin',component: AdminPageComponent},
        {path:'basic', component: BasicPageComponent},
        {path:'premium', component: PremiumPageComponent},
        {path:'calendar', component: CalendarComponent}
      ]},
      { path:'contact',component: ContactComponent},

  { path: '', redirectTo: 'home', pathMatch:'full' } // Redirecciona a la página de login si la ruta no se encuentra
];

export class AppRoutingModule {}
