import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MockDataService, NewsItem } from '../services/mock-data.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="text-center mb-5 fade-in">
      <h1 class="display-4 fw-bold text-primary-custom mb-3">Hola, Carla</h1>
      <p class="lead text-muted mb-4">¿Qué quieres hacer hoy?</p>
      
      <div class="row justify-content-center mb-5">
        <div class="col-md-8 col-lg-6">
          <div class="input-group input-group-lg shadow-sm" style="border-radius: 2rem; overflow: hidden;">
            <span class="input-group-text bg-white border-end-0 text-primary-custom ps-4">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" class="form-control border-start-0 ps-0" placeholder="Busca asignaturas, profesores, dudas..." aria-label="Search">
            <button class="btn btn-primary-custom px-4" type="button">Buscar</button>
          </div>
        </div>
      </div>

      <!-- News & Updates Section -->
      <div class="row mb-5 fade-in">
        <div class="col-12">
           <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
             <div class="card-body p-0">
               <div class="d-flex align-items-center p-4 border-bottom bg-white">
                 <div class="icon-square bg-warning-custom text-white rounded-circle p-3 me-3 shadow-sm" style="background-color: #ffc107;">
                   <i class="bi bi-megaphone-fill fs-4"></i>
                 </div>
                 <h3 class="card-title h5 mb-0 fw-bold text-primary-custom">Tablón de Anuncios</h3>
               </div>
               
               <div class="list-group list-group-flush">
                 @for (news of news$ | async; track news.id) {
                   <button (click)="openNewsDetail(news)" class="list-group-item list-group-item-action border-0 p-4 news-item-hover">
                     <div class="d-flex justify-content-between align-items-start">
                       <div class="me-3">
                         <div class="d-flex align-items-center mb-2">
                            <span class="badge rounded-pill fw-normal px-3 py-1 me-2 shadow-sm" 
                                  [ngClass]="{
                                    'bg-primary-subtle text-primary': news.category === 'Académico',
                                    'bg-success-subtle text-success': news.category === 'Eventos',
                                    'bg-warning-subtle text-warning-emphasis': news.category === 'Administración'
                                  }" style="font-size: 0.8rem;">
                              {{ news.category }}
                            </span>
                            <small class="text-muted text-nowrap" style="font-size: 0.8rem;">{{ news.date }}</small>
                         </div>
                         <h6 class="mb-1 text-dark fw-bold news-title" style="font-size: 1.1rem;">{{ news.title }}</h6>
                         <p class="text-muted fs-small mb-0 text-truncate" style="max-width: 90%;">{{ news.content?.substring(0, 100) }}...</p>
                       </div>
                       <i class="bi bi-chevron-right text-muted opacity-50 align-self-center"></i>
                     </div>
                   </button>
                 }
               </div>

             </div>
           </div>
        </div>
      </div>

      <div class="row g-4 text-start">
        <!-- Forum Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm border-0 card-hover rounded-4" routerLink="/forum">
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
          <div class="card h-100 shadow-sm border-0 card-hover rounded-4" routerLink="/grades">
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
          <div class="card h-100 shadow-sm border-0 card-hover rounded-4" routerLink="/calendar">
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
          <div class="card h-100 shadow-sm border-0 card-hover rounded-4" routerLink="/chat">
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
           <div class="card h-100 shadow-sm border-0 card-hover bg-primary-custom text-white rounded-4" routerLink="/booking">
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

    <!-- Details Modal -->
    <div class="modal fade show d-block" *ngIf="selectedNews" tabindex="-1" role="dialog" style="background-color: rgba(0,0,0,0.5);">
       <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
         <div class="modal-content rounded-4 border-0 shadow-lg">
           <div class="modal-header border-0 pb-0 pt-4 px-4">
             <div class="d-flex align-items-center">
                <span class="badge rounded-pill fw-normal px-3 py-1 me-2"
                      [ngClass]="{
                        'bg-primary-subtle text-primary': selectedNews.category === 'Académico',
                        'bg-success-subtle text-success': selectedNews.category === 'Eventos',
                        'bg-warning-subtle text-warning-emphasis': selectedNews.category === 'Administración'
                      }">{{ selectedNews.category }}</span>
                <small class="text-muted">{{ selectedNews.date }}</small>
             </div>
             <button type="button" class="btn-close" aria-label="Close" (click)="closeNewsDetail()"></button>
           </div>
           <div class="modal-body p-4">
             <h2 class="h3 fw-bold ps-0 mb-4 text-primary-custom lh-sm">{{ selectedNews.title }}</h2>
             <div class="text-muted lh-lg" style="white-space: pre-line;">
               <p>{{ selectedNews.content }}</p>
               <p class="opacity-75 mt-3 fst-italic text-muted small border-top pt-3">
                 Para más información sobre este anuncio, por favor contacte con la secretaría del centro o envíe un correo a info&#64;instituto.edu.
               </p>
             </div>
           </div>
           <div class="modal-footer border-0 p-4 pt-0">
             <button *ngIf="selectedNews.id === 1" 
                     type="button" 
                     class="btn btn-primary-custom rounded-pill px-4 me-auto fw-bold shadow-sm"
                     (click)="closeNewsDetail()" 
                     routerLink="/booking">
               Solicitar Asesoramiento
             </button>
             <button type="button" class="btn btn-light rounded-pill px-4 text-primary-custom fw-bold" (click)="closeNewsDetail()">Cerrar</button>
           </div>
         </div>
       </div>
    </div>
  `,
  styles: [`
    .rounded-4 { border-radius: 1.5rem !important; }
    
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
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
    
    .news-item-hover {
      transition: background-color 0.2s, transform 0.2s;
      cursor: pointer;
      text-align: left; /* Ensure text align for button element */
      width: 100%; /* Ensure full width for button */
    }
    .news-item-hover:hover {
      background-color: var(--bs-gray-100); 
      background-color: #f8f9fa; /* Explicit light bg */
    }
    .news-title {
       transition: color 0.2s;
    }
    .news-item-hover:hover .news-title {
       color: var(--electric-violet) !important;
       /* text-decoration: underline; Optional refined style */
    }
    
    .icon-square {
      width: 3.5rem;
      height: 3.5rem;
      aspect-ratio: 1 / 1;
      flex-shrink: 0;
      display: flex !important;
      align-items: center;
      justify-content: center;
      padding: 0 !important;
    }
  `]
})
export class HomePage implements OnInit {
  private dataService = inject(MockDataService);
  news$!: Observable<NewsItem[]>;
  selectedNews: NewsItem | null = null;

  ngOnInit() {
    this.news$ = this.dataService.getNews();
  }

  openNewsDetail(item: NewsItem) {
    this.selectedNews = item;
  }

  closeNewsDetail() {
    this.selectedNews = null;
  }
}
