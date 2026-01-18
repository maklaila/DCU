import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="login-container d-flex align-items-center justify-content-center min-vh-100">
      <div class="card login-card border-0 shadow-lg rounded-5 p-5">
        <div class="card-body p-0">
          <div class="text-center mb-4">
            <h2 class="fw-bold text-primary-custom">Bachillerato's Mind</h2>
          </div>
          
          <form (submit)="onLogin($event)">
            <div class="mb-4">
              <label for="email" class="form-label visually-hidden">Correo electrónico</label>
              <input type="email" class="form-control form-control-lg rounded-pill bg-light border-0" id="email" placeholder="Correo electrónico">
            </div>
            
            <div class="mb-4">
              <label for="password" class="form-label visually-hidden">Contraseña</label>
              <input type="password" class="form-control form-control-lg rounded-pill bg-light border-0" id="password" placeholder="Contraseña">
            </div>
            
            <button type="submit" class="btn btn-primary-custom w-100 rounded-pill py-2 mb-3 fw-bold">Entrar</button>
            
            <div class="text-center">
              <a href="#" class="text-secondary text-decoration-none small">¿Has olvidado tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .login-container {
      background-color: var(--lighter-blue);
    }
    
    .login-card {
      width: 100%;
      max-width: 450px;
      /* Soft UI effect tweaks can go here if needed, but bootstrap classes covers most */
    }
    
    .form-control:focus {
      box-shadow: none;
      border: 1px solid var(--secondary-color);
    }
    
    .btn-primary-custom {
      font-size: 1.1rem;
      transition: all 0.3s ease;
    }
    
    .btn-primary-custom:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(3, 4, 94, 0.2);
    }
  `]
})
export class LoginPage {
  constructor(private router: Router) { }

  onLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/home']);
  }
}
