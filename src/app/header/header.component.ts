import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  showDashboardNavbar: boolean = false;
  private authSubscription!: Subscription;

  constructor(private router: Router, private usuarioService: UsuarioService) {
    this.navBarSelector();


    this.authSubscription = this.usuarioService.loggedIn$.subscribe(loggedIn => {
      this.updateNavBar(loggedIn);
    });
  }

  ngOnDestroy() {

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private navBarSelector() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.router.url === '/home' ||
      this.router.url === '/register' ||
      this.router.url === '/login';
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

  navigateToCerrarSesion() {
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/home']);
  }
}
