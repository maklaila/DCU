import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="container-fluid min-vh-100 d-flex flex-column p-0">
      <!-- Navbar / Back Button Simulation -->
      <div class="d-flex align-items-center p-4">
        <a routerLink="/home" class="btn btn-light rounded-pill shadow-sm text-primary-custom fw-bold px-4 d-flex align-items-center gap-2 transition-transform">
          <i class="bi bi-arrow-left"></i> 
          Volver al Inicio
        </a>
      </div>

      <!-- Main Content -->
      <div class="flex-grow-1 d-flex align-items-center justify-content-center p-4 pb-5">
        <div class="card border-0 shadow-lg rounded-5 bg-white profile-card fade-in-up">
          <div class="card-body p-5">
            
            <!-- Header -->
            <div class="text-center mb-5">
              <div class="position-relative d-inline-block mb-3">
                <img src="https://ui-avatars.com/api/?name=Carla+Rodriguez&size=128&background=random" 
                     alt="Carla Rodríguez" 
                     class="rounded-circle shadow-sm"
                     width="128" height="128">
                 <span class="position-absolute bottom-0 end-0 p-2 bg-success border border-white rounded-circle indicator">
                    <span class="visually-hidden">Online</span>
                 </span>
              </div>
              <h2 class="fw-bold text-primary-custom mb-1">Carla Rodríguez</h2>
              <p class="text-muted fs-5 mb-0">2º Bachillerato Científico</p>
            </div>

            <!-- Form Data -->
            <form>
              <div class="row g-4">
                <div class="col-md-6">
                  <label class="form-label small text-muted fw-bold text-uppercase tracking-wide">Nombre</label>
                  <input type="text" class="form-control form-control-lg bg-light border-0 rounded-4 text-dark fw-medium" value="Carla" readonly>
                </div>
                <div class="col-md-6">
                   <label class="form-label small text-muted fw-bold text-uppercase tracking-wide">Apellidos</label>
                   <input type="text" class="form-control form-control-lg bg-light border-0 rounded-4 text-dark fw-medium" value="Rodríguez" readonly>
                </div>
                <div class="col-12">
                   <label class="form-label small text-muted fw-bold text-uppercase tracking-wide">Email Institucional</label>
                   <div class="input-group">
                      <span class="input-group-text bg-light border-0 rounded-start-4 ps-3 text-muted">
                        <i class="bi bi-envelope"></i>
                      </span>
                      <input type="email" class="form-control form-control-lg bg-light border-0 rounded-end-4 text-dark fw-medium" value="carla.rodriguez@dcu.edu" readonly>
                   </div>
                </div>
                <div class="col-12">
                   <label class="form-label small text-muted fw-bold text-uppercase tracking-wide">Centro Educativo</label>
                   <div class="input-group">
                      <span class="input-group-text bg-light border-0 rounded-start-4 ps-3 text-muted">
                        <i class="bi bi-building"></i>
                      </span>
                      <input type="text" class="form-control form-control-lg bg-light border-0 rounded-end-4 text-dark fw-medium" value="Digital Campus University" readonly>
                   </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="d-grid gap-3 d-md-flex justify-content-md-center mt-5 pt-2">
                 <button type="button" class="btn btn-primary-custom btn-lg rounded-pill px-5 shadow-sm fw-bold transition-transform" (click)="saveChanges()">
                    Guardar Cambios
                 </button>
                 <button type="button" class="btn btn-outline-danger btn-lg rounded-pill px-5 fw-bold transition-transform" (click)="logout()">
                    Cerrar Sesión
                 </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      /* Background will show through from body/main if set to transparent */
    }
    
    .profile-card {
      max-width: 800px;
      width: 100%;
    }
    
    .form-control:focus {
      box-shadow: none;
      background-color: #e9ecef; 
    }

    .tracking-wide {
      letter-spacing: 0.05em;
    }

    .indicator {
      width: 20px;
      height: 20px;
      padding: 0 !important;
    }

    .btn-primary-custom {
       background-color: #6f42c1; /* Fallback if var not set, close to purple/violet */
       background-color: var(--electric-violet, #6f42c1);
       border-color: var(--electric-violet, #6f42c1);
       color: white;
    }
    .btn-primary-custom:hover {
       background-color: var(--french-violet, #563d7c);
       border-color: var(--french-violet, #563d7c);
    }

    .text-primary-custom {
      color: var(--electric-violet, #6f42c1);
    }
    
    .bg-light {
      background-color: #f8f9fa !important;
    }

    .transition-transform {
      transition: transform 0.2s ease;
    }
    .transition-transform:hover {
      transform: translateY(-2px);
    }
    .transition-transform:active {
      transform: translateY(0);
    }

    .fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translate(0, 40px); }
      to { opacity: 1; transform: translate(0, 0); }
    }
  `]
})
export class ProfilePage {
    saveChanges() {
        // Simulation
        alert('¡Cambios guardados con éxito!');
    }

    logout() {
        // Simulation
        if (confirm('¿Seguro que quieres cerrar sesión?')) {
            alert('Sesión cerrada.');
        }
    }
}
