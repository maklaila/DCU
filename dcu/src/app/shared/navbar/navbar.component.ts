import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary-custom fixed-top shadow">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">
          <i class="bi bi-mortarboard-fill me-2"></i>Bachillerato's Mind
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto d-flex align-items-center">
            <li class="nav-item">
              <a class="nav-link" routerLink="/home" routerLinkActive="active">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/grades" routerLinkActive="active">Notas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/calendar" routerLinkActive="active">Calendario</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/forum" routerLinkActive="active">Foro</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/chat" routerLinkActive="active">Chat</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/shop" routerLinkActive="active">Materiales</a>
            </li>
            <li class="nav-item ms-lg-3">
               <a class="btn btn-outline-light btn-sm rounded-pill px-3" routerLink="/booking">
                 Reserva Tutoría
               </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-brand {
      color: var(--lighter-blue) !important;
    }
    .nav-link {
      color: rgba(255,255,255,0.8) !important;
      transition: color 0.2s;
    }
    .nav-link:hover, .nav-link.active {
      color: #fff !important;
      font-weight: 500;
    }
  `]
})
export class NavbarComponent {
  // We rely on Bootstrap JS for the toggler, but since we might not have 'bootstrap.bundle.js' imported in scripts, 
  // the toggler might not work without additional config or adding the script to angular.json.
  // For 'visual redesign' often CSS is enough for desktop, but mobile menu needs JS.
  // I will check if I need to add bootstrap js script to angular.json later.
}
