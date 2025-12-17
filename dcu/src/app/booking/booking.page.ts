import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockDataService, Tutor, TimeSlot } from '../services/mock-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container fade-in mb-5">
      <div class="row mb-4 align-items-center">
        <div class="col">
           <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item"><a routerLink="/home" class="text-decoration-none">Inicio</a></li>
              <li class="breadcrumb-item active" aria-current="page">Reservas</li>
            </ol>
          </nav>
          <h2 class="fw-bold text-primary-custom mb-0">Reservar Tutoría</h2>
          <p class="text-muted">Selecciona un tutor y un horario disponible.</p>
        </div>
      </div>
      
      <div class="row g-4 justify-content-center">
        @for (tutor of tutors$ | async; track tutor.id) {
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
               <div class="card-body p-4 text-center">
                  <div class="mb-3 position-relative d-inline-block">
                     <div class="bg-light rounded-circle p-1">
                        <img [src]="tutor.avatar" 
                             alt="{{tutor.name}}" 
                             class="rounded-circle"
                             style="width: 80px; height: 80px; object-fit: cover;"
                             onerror="this.src='https://ui-avatars.com/api/?name=' + this.alt + '&background=random'">
                     </div>
                     <span class="position-absolute bottom-0 end-0 p-1 bg-success border border-light rounded-circle">
                       <span class="visually-hidden">Disponible</span>
                     </span>
                  </div>
                  
                  <h5 class="fw-bold text-primary-custom mb-1">
                      {{ tutor.name }}
                      @if (tutor.id === 1) {
                        <i class="bi bi-patch-check-fill text-warning ms-1" title="Tutor Destacado"></i>
                      }
                  </h5>
                  <span class="badge bg-primary-subtle text-primary rounded-pill mb-3">{{ tutor.subject }}</span>
                  
                  @if (tutor.id === 1) {
                      <div class="mb-3">
                        <span class="badge bg-warning text-dark rounded-pill shadow-sm">
                           <i class="bi bi-star-fill me-1"></i> Recomendado
                        </span>
                      </div>
                  }

                  <p class="small text-muted mb-4"><i class="bi bi-clock me-1"></i>{{ tutor.availabilityText }}</p>
                  
                  <div class="d-flex flex-wrap justify-content-center gap-2">
                     @for (slot of tutor.slots; track slot.time) {
                        <button type="button" 
                                class="btn btn-sm rounded-pill fw-semibold slot-btn"
                                [class.btn-outline-secondary]="slot.status === 'available' && !isSlotSelected(tutor.id, slot.time)"
                                [class.btn-primary-custom]="isSlotSelected(tutor.id, slot.time)"
                                [class.text-white]="isSlotSelected(tutor.id, slot.time)"
                                [class.disabled]="slot.status === 'occupied'"
                                [class.bg-light]="slot.status === 'occupied'"
                                [class.text-muted]="slot.status === 'occupied'"
                                [disabled]="slot.status === 'occupied'"
                                (click)="selectSlot(tutor, slot)"
                                style="min-width: 70px;">
                          {{ slot.time }}
                        </button>
                     }
                  </div>
               </div>
            </div>
          </div>
        }
      </div>
    </div>

    <!-- Floating Action Capsule -->
    <div *ngIf="selectedSlot" class="position-fixed bottom-0 start-50 translate-middle-x mb-4 shadow-lg rounded-pill bg-primary-custom p-3 px-5 d-flex align-items-center gap-4 fade-in-up booking-fab">
         
         <div class="flex-grow-1">
           <span class="text-white-50 small d-block">Horario seleccionado</span>
           <div class="d-flex align-items-center">
             <i class="bi bi-check-circle-fill text-success me-2"></i>
             <span class="fw-bold text-white">{{ selectedSlot.tutorName }} - {{ selectedSlot.time }}</span>
           </div>
         </div>

         <button class="btn btn-light rounded-pill px-4 fw-bold text-primary-custom shadow-sm" 
                 (click)="confirmBooking()">
           Confirmar
         </button>
    </div>

    <!-- Success Modal -->
    <div class="modal fade show d-block" *ngIf="showSuccessModal" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 border-0 shadow-lg p-3">
          <div class="modal-body text-center">
            <div class="mb-3 text-success">
               <i class="bi bi-check-circle-fill" style="font-size: 4rem;"></i>
            </div>
            <h3 class="fw-bold mb-3 text-primary-custom">¡Reserva Confirmada!</h3>
            <p class="text-muted mb-4 lead fs-6">
              Te hemos enviado un correo con los detalles para el <span class="fw-bold text-dark">Jueves a las 17:00</span>.
            </p>
            <button class="btn btn-primary-custom rounded-pill w-100 fw-bold py-2" (click)="closeModal()" routerLink="/home">
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rounded-4 { border-radius: 1.5rem !important; }
    /* Soft light blue background for the page context (if applied to body, but here we style the container implied context) */
    :host {
      display: block;
      background-color: #f0f4f8; /* Soft blueish gray */
      min-height: 100vh;
      padding-top: 2rem;
    }

    .fade-in { animation: fadeIn 0.5s ease-in; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translate(-50%, 20px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
    
    .slot-btn {
       transition: all 0.2s;
    }
    .slot-btn:hover:not(.disabled):not(.btn-primary-custom) {
       transform: translateY(-2px);
       background-color: var(--electric-violet);
       color: white;
       border-color: var(--electric-violet);
    }
    /* Fixed bottom spacing */
    .container { padding-bottom: 100px; }

    .booking-fab {
      z-index: 1050;
      width: 90vw;
      min-width: 320px;
    }
    @media (min-width: 768px) {
      .booking-fab {
        width: 50vw;
        min-width: 600px;
      }
    }
  `]
})
export class BookingPage implements OnInit {
  private dataService = inject(MockDataService);

  tutors$!: Observable<Tutor[]>;

  selectedSlot: { tutorId: number; tutorName: string; time: string } | null = null;
  showSuccessModal = false;

  ngOnInit() {
    this.tutors$ = this.dataService.getTutors();
  }

  selectSlot(tutor: Tutor, slot: TimeSlot) {
    if (slot.status === 'occupied') return;

    this.selectedSlot = {
      tutorId: tutor.id,
      tutorName: tutor.name,
      time: slot.time
    };
  }

  isSlotSelected(tutorId: number, time: string): boolean {
    return this.selectedSlot?.tutorId === tutorId && this.selectedSlot?.time === time;
  }

  confirmBooking() {
    this.showSuccessModal = true;
  }

  closeModal() {
    this.showSuccessModal = false;
  }
}
