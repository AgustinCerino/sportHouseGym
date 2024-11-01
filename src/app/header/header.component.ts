import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showDashboardNavbar: boolean = false;



  constructor(private router: Router) {

    this.navBarSelector();
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

  navBarSelector() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtra solo los eventos de navegación finalizados
    ).subscribe(() => {
      this.showDashboardNavbar =
      this.router.url === '/home' ||
      this.router.url === '/register' ||
      this.router.url === '/login';
    });
  }

}
