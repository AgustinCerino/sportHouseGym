
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/log-page/login/login.component';
import { HomeComponent } from './home/home.component';
import { ModificarUsuarioComponent } from './pages/profile-page/modificar-usuario/modificar-usuario.component';
import { RoutineListComponent } from './pages/routine-page/routine-list/routine-list.component';
import { RegisterComponent } from './pages/log-page/register/register.component';
import { RoutineDetailsComponent } from './pages/routine-page/routine-details/routine-details.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { VerPerfilComponent } from './pages/profile-page/ver-perfil/ver-perfil.component';
import { LogPageComponent } from './pages/log-page/log-page.component';
import { RoutinePageComponent } from './pages/routine-page/routine-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AdminPageComponent } from './pages/user-page/admin-user/admin-page.component';
import { BasicPageComponent } from './pages/user-page/basic-user/basic-page.component';
import { PremiumPageComponent } from './pages/user-page/premium-user/premium-page.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  ///Rutas de perfil


      { path: 'profile', component: ProfilePageComponent, children: [
        { path: ':id', component: VerPerfilComponent },
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
        {path:'premium', component: PremiumPageComponent}
      ]},

  { path: '', redirectTo: 'home', pathMatch:'full' } // Redirecciona a la página de login si la ruta no se encuentra
];

export class AppRoutingModule {}
