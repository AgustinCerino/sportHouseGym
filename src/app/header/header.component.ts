import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy , OnInit{
  showDashboardNavbar: boolean = false;
  private authSubscription!: Subscription;
  private rolSubscription!: Subscription;
  rol !:string

  constructor(private router: Router, private usuarioService: UsuarioService) {
    this.navBarSelector();

    this.authSubscription = this.usuarioService.loggedIn$.subscribe(loggedIn => {
      this.updateNavBar(loggedIn);

      if (loggedIn) {
        this.updateUserRole();
      }
    });

  }
  ngOnInit(): void {

      this.updateUserRole();
  }

  private updateUserRole() {
    this.rolSubscription = this.usuarioService.getUsuarioActual().subscribe(data => {
      this.rol = data.role;
    });
  }

  ngOnDestroy() {

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.rolSubscription) {
      this.rolSubscription.unsubscribe();
    }
  }

  private navBarSelector() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const isAuthRoute = this.router.url === '/login' || this.router.url === '/register';
      const isLoggedIn = this.usuarioService.isAuthenticated();
      this.showDashboardNavbar = isAuthRoute || !isLoggedIn;
    });
  }


  private updateNavBar(loggedIn: boolean) {
    this.showDashboardNavbar = !loggedIn;
  }

  navigateToLogin() {
    this.router.navigate(['/log']);
  }

  navigateToRoutines() {
    this.router.navigate(['/routines']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToRegister() {
    this.router.navigate(['log/register']);
  }

  navigateToVerPerfil() {
    this.router.navigate(['/profile']);
  }

  navigateToContact()
  {
    this.router.navigate(['/contact']);
  }

  navigateToCerrarSesion() {
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/home']);
  }
  navigateToPremiumPlan(){
    this.router.navigate(['/payment'])
  }

navigateToAdmin(){
  this.router.navigate(['/user/admin'])
}
navigateToBasic(){
  this.router.navigate(['/user/basic'])
}
navigateToPremium(){
  this.router.navigate(['/user/premium'])
}

}
