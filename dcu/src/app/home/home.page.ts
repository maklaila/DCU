import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="text-center mb-5 fade-in">
      <h1 class="display-4 fw-bold text-primary-custom mb-3">Hola, Carla</h1>
      <p class="lead text-muted mb-4">¿Qué quieres hacer hoy?</p>
      
      <div class="row justify-content-center mb-5">
        <div class="col-md-8 col-lg-6">
          <div class="input-group input-group-lg shadow-sm">
            <span class="input-group-text bg-white border-end-0 text-primary-custom">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" class="form-control border-start-0 ps-0" placeholder="Busca asignaturas, profesores, dudas..." aria-label="Search">
            <button class="btn btn-primary-custom px-4" type="button">Buscar</button>
          </div>
        </div>
      </div>

      <div class="row g-4 text-start">
        <!-- Forum Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm border-0 card-hover" routerLink="/forum">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-3">
                <div class="icon-square bg-primary-custom text-white rounded-circle p-3 me-3">
                  <i class="bi bi-chat-square-text-fill fs-4"></i>
                </div>
                <h3 class="card-title h5 mb-0 fw-bold text-primary-custom">Foro de Alumnos</h3>
              </div>
              <p class="card-text text-muted">Resuelve tus dudas y ayuda a tus compañeros. 15 discusiones nuevas.</p>
            </div>
            <div class="card-footer bg-transparent border-0 p-4 pt-0">
               <span class="text-secondary-custom fw-bold fs-6">Ir al Foro <i class="bi bi-arrow-right"></i></span>
            </div>
          </div>
        </div>

        <!-- Grades Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm border-0 card-hover" routerLink="/grades">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-3">
                <div class="icon-square bg-secondary-custom text-white rounded-circle p-3 me-3">
                  <i class="bi bi-bar-chart-fill fs-4"></i>
                </div>
                <h3 class="card-title h5 mb-0 fw-bold text-primary-custom">Mis Notas</h3>
              </div>
              <p class="card-text text-muted">Consulta tu rendimiento académico en tiempo real. 2 notas nuevas.</p>
            </div>
            <div class="card-footer bg-transparent border-0 p-4 pt-0">
               <span class="text-secondary-custom fw-bold fs-6">Ver Notas <i class="bi bi-arrow-right"></i></span>
            </div>
          </div>
        </div>

        <!-- Calendar Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm border-0 card-hover" routerLink="/calendar">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-3">
                <div class="icon-square bg-tertiary-custom text-white rounded-circle p-3 me-3">
                  <i class="bi bi-calendar-event-fill fs-4"></i>
                </div>
                <h3 class="card-title h5 mb-0 fw-bold text-primary-custom">Calendario</h3>
              </div>
              <p class="card-text text-muted">Organiza tus exámenes y entregas. Próximo examen: Filosofía (2 días).</p>
            </div>
            <div class="card-footer bg-transparent border-0 p-4 pt-0">
               <span class="text-secondary-custom fw-bold fs-6">Ver Calendario <i class="bi bi-arrow-right"></i></span>
            </div>
          </div>
        </div>

        <!-- Chat Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm border-0 card-hover" routerLink="/chat">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-3">
                <div class="icon-square bg-info text-white rounded-circle p-3 me-3" style="background-color: var(--light-blue) !important">
                  <i class="bi bi-people-fill fs-4"></i>
                </div>
                <h3 class="card-title h5 mb-0 fw-bold text-primary-custom">Estudio Colectivo</h3>
              </div>
              <p class="card-text text-muted">Videochat y grupos de repaso. Grupo activo: Filosofía.</p>
            </div>
             <div class="card-footer bg-transparent border-0 p-4 pt-0">
               <span class="text-secondary-custom fw-bold fs-6">Unirse al Chat <i class="bi bi-arrow-right"></i></span>
            </div>
          </div>
        </div>

         <!-- Booking Card (Highlight) -->
        <div class="col-md-12 col-lg-8">
           <div class="card h-100 shadow-sm border-0 card-hover bg-primary-custom text-white" routerLink="/booking">
            <div class="card-body p-4 d-flex flex-column flex-md-row align-items-center justify-content-between">
              <div class="mb-3 mb-md-0">
                <div class="d-flex align-items-center mb-2">
                   <div class="icon-square bg-white text-primary-custom rounded-circle p-2 me-3">
                      <i class="bi bi-bookmark-star-fill fs-5"></i>
                    </div>
                   <h3 class="card-title h4 mb-0 fw-bold">Reservar Tutoría</h3>
                </div>
                <p class="card-text opacity-75 mb-0">Orientación académica y refuerzo escolar personalizado.</p>
              </div>
              <button class="btn btn-light rounded-pill px-4 fw-bold text-primary-custom">Reservar Ahora</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
    styles: [`
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
      cursor: pointer;
    }
    .card-hover {
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .fade-in {
      animation: fadeIn 0.5s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HomePage {

}
