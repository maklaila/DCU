import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MockDataService, CalendarEvent } from '../services/mock-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
     <div class="mb-4">
       <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/home" class="text-decoration-none">Inicio</a></li>
          <li class="breadcrumb-item active" aria-current="page">Calendario</li>
        </ol>
      </nav>

      <div class="row">
        <!-- Calendar Grid -->
        <div class="col-lg-8 mb-4">
          <div class="card shadow-sm border-0 h-100 rounded-4">
            <div class="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center rounded-top-4">
               <h4 class="fw-bold text-primary-custom mb-0 text-capitalize">{{ currentMonth | date:'MMMM yyyy' }}</h4>
               
               <div class="d-flex align-items-center">
                 <button class="btn btn-primary-custom btn-sm rounded-pill me-3 px-3" (click)="openModal()">
                    <i class="bi bi-plus-lg me-1"></i> Nuevo Evento
                 </button>
                 <div>
                   <button class="btn btn-light btn-sm rounded-circle me-1"><i class="bi bi-chevron-left"></i></button>
                   <button class="btn btn-light btn-sm rounded-circle"><i class="bi bi-chevron-right"></i></button>
                 </div>
               </div>
            </div>
            <div class="card-body">
              <div class="row text-center fw-bold text-muted mb-3">
                <div class="col">Lun</div>
                <div class="col">Mar</div>
                <div class="col">Mié</div>
                <div class="col">Jue</div>
                <div class="col">Vie</div>
                <div class="col">Sáb</div>
                <div class="col">Dom</div>
              </div>
              <!-- Weeks -->
              <div class="row mb-2" *ngFor="let week of weeks">
                 <div class="col py-2 border border-light position-relative" style="min-height: 100px;" *ngFor="let day of week">
                    <span [class.text-muted]="!day.isCurrentMonth" 
                          [class.fw-bold]="day.isToday"
                          [class.text-primary-custom]="day.isToday"
                          class="d-inline-block p-1 small">
                      {{ day.number }}
                    </span>
                    
                    <!-- Event List in Cell -->
                    <div class="d-flex flex-column gap-1 mt-1">
                      <div *ngFor="let event of day.events" 
                           class="badge text-truncate text-start w-100 p-1 fw-normal"
                           [class.bg-danger]="event.type === 'exam'"
                           [class.bg-primary-custom]="event.type === 'assignment'"
                           [class.text-white]="true"
                           [title]="event.title"
                           (click)="openDetailModal(event)"
                           style="font-size: 0.7rem; cursor: pointer;">
                        {{ event.title }}
                      </div>
                    </div>

                 </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Events List -->
        <div class="col-lg-4 mb-4">
           <div class="card border-0 bg-transparent mb-4">
             <div class="card-body p-0">
               <h4 class="fw-bold text-primary-custom mb-3">Próximos Eventos</h4>
               <div class="list-group shadow-sm rounded-4 overflow-hidden">
                 <div *ngFor="let event of events$ | async" class="list-group-item border-0 border-bottom p-3">
                   <div class="d-flex w-100 justify-content-between align-items-center mb-1">
                     <h6 class="mb-0 fw-bold">{{ event.title }}</h6>
                     <span class="badge rounded-pill" 
                           [class.bg-danger]="event.type === 'exam'"
                           [class.bg-primary-custom]="event.type === 'assignment'"
                           [class.text-white]="true">
                       {{ event.type === 'exam' ? 'Examen' : 'Entrega' }}
                     </span>
                   </div>
                   <small class="text-muted"><i class="bi bi-clock me-1"></i> {{ event.date | date:'dd/MM/yyyy' }}</small>
                 </div>
                 
                 <div class="list-group-item border-0 p-3 bg-light text-center text-muted" *ngIf="(events$ | async)?.length === 0">
                   <small>No hay eventos programados</small>
                 </div>
               </div>
             </div>
           </div>

           <div class="card bg-primary-custom text-white border-0 shadow-sm rounded-4 mb-4">
             <div class="card-body p-4 text-center">
               <i class="bi bi-clock-history fs-1 mb-2"></i>
               <h5 class="fw-bold">Tiempo de Estudio</h5>
               <p class="mb-0 opacity-75">Has estudiado 12 horas esta semana. ¡Sigue así!</p>
             </div>
           </div>
           
           <!-- Cross Navigation -->
           <a routerLink="/grades" class="card bg-white text-primary-custom border-0 shadow-sm rounded-4 text-decoration-none hover-scale">
             <div class="card-body p-4 d-flex align-items-center justify-content-between">
                <div>
                  <h6 class="fw-bold mb-1">¿Dudas con tu rendimiento?</h6>
                  <span class="small text-muted">Consulta tus notas al detalle <i class="bi bi-arrow-right"></i></span>
                </div>
                <div class="icon-square bg-primary-subtle text-primary-custom rounded-circle p-2">
                   <i class="bi bi-graph-up fs-4"></i>
                </div>
             </div>
           </a>
        </div>

      </div>
     </div>

    <!-- New Event Modal -->
    <div class="modal-backdrop fade show" *ngIf="showModal || showDetailModal"></div>
    
    <div class="modal fade show d-block" *ngIf="showModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow-lg rounded-4">
          <div class="modal-header bg-primary-custom text-white">
            <h5 class="modal-title fw-bold">Nuevo Evento</h5>
            <button type="button" class="btn-close btn-close-white" (click)="closeModal()"></button>
          </div>
          <div class="modal-body p-4">
            <form>
              <div class="mb-3">
                <label for="eventTitle" class="form-label fw-bold">Título</label>
                <input type="text" class="form-control" id="eventTitle" [(ngModel)]="newEvent.title" name="title" placeholder="Ej: Examen Matemáticas">
              </div>
              <div class="mb-3">
                <label for="eventDate" class="form-label fw-bold">Fecha</label>
                <input type="date" class="form-control" id="eventDate" [(ngModel)]="newEvent.date" name="date">
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Tipo</label>
                <select class="form-select" [(ngModel)]="newEvent.type" name="type">
                  <option value="exam">Examen</option>
                  <option value="assignment">Entrega / Trabajo</option>
                  <option value="reminder">Recordatorio</option>
                </select>
              </div>
              <div class="mb-3">
                 <label class="form-label fw-bold">Descripción</label>
                 <textarea class="form-control" [(ngModel)]="newEvent.description" name="description" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-link text-muted text-decoration-none" (click)="closeModal()">Cancelar</button>
            <button type="button" class="btn btn-primary-custom rounded-pill px-4" (click)="addEvent()" [disabled]="!newEvent.title || !newEvent.date">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Detail Modal -->
    <div class="modal fade show d-block" *ngIf="showDetailModal && selectedEvent" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow-lg rounded-4">
          <div class="modal-header border-0 pb-0 pt-4 px-4">
             <div class="d-flex align-items-center">
                <span class="badge rounded-pill fw-normal px-3 py-1 me-2" 
                      [class.bg-danger]="selectedEvent.type === 'exam'"
                      [class.bg-primary-custom]="selectedEvent.type === 'assignment'"
                      [class.bg-secondary]="selectedEvent.type === 'reminder'">
                    {{ selectedEvent.type === 'exam' ? 'Exame' : (selectedEvent.type === 'assignment' ? 'Entrega' : 'Recordatorio') }}
                </span>
                <small class="text-muted">{{ selectedEvent.date | date:'fullDate' }}</small>
             </div>
            <button type="button" class="btn-close" (click)="closeDetailModal()"></button>
          </div>
          <div class="modal-body p-4">
            <h3 class="fw-bold text-primary-custom mb-3">{{ selectedEvent.title }}</h3>
            <p class="text-muted lead fs-6" *ngIf="selectedEvent.description">{{ selectedEvent.description }}</p>
            <p class="text-muted small fst-italic" *ngIf="!selectedEvent.description">Sin descripción adicional.</p>
          </div>
          <div class="modal-footer border-0 p-4 pt-0">
             <button class="btn btn-light rounded-pill px-4" (click)="closeDetailModal()">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .date-cell:hover {
      background-color: var(--light-blue);
      cursor: pointer;
    }
    .rounded-4 { border-radius: 1.5rem !important; }
    .fade-in { animation: fadeIn 0.5s ease-in; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class CalendarPage implements OnInit {
  private dataService = inject(MockDataService);
  events$!: Observable<CalendarEvent[]>;

  weeks: any[][] = [];
  currentMonth = new Date();

  // New Event Modal State
  showModal = false;
  newEvent: any = {
    title: '',
    date: '',
    type: 'exam'
  };

  // Detail Modal State
  showDetailModal = false;
  selectedEvent: CalendarEvent | null = null;

  ngOnInit() {
    this.events$ = this.dataService.getCalendarEvents();
    this.events$.subscribe(events => {
      this.generateCalendar(events);
    });
  }

  generateCalendar(events: CalendarEvent[]) {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const daysInMonth = lastDay.getDate();

    // Previous month days
    const prevMonthDays: any[] = [];
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push({ number: prevMonthLastDate - i, isCurrentMonth: false, events: [] });
    }

    // Current month days
    const currentMonthDays: any[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      // Find events for this day
      const dayEvents = events.filter(e =>
        e.date.getDate() === i &&
        e.date.getMonth() === month &&
        e.date.getFullYear() === year
      );

      const isToday = new Date().toDateString() === new Date(year, month, i).toDateString();

      currentMonthDays.push({
        number: i,
        isCurrentMonth: true,
        isToday: isToday,
        events: dayEvents
      });
    }

    // Next month days
    const nextMonthDays: any[] = [];
    const totalFilled = prevMonthDays.length + currentMonthDays.length;
    const remaining = 42 - totalFilled;
    for (let i = 1; i <= remaining; i++) {
      nextMonthDays.push({ number: i, isCurrentMonth: false, events: [] });
    }

    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    this.weeks = [];
    for (let i = 0; i < allDays.length; i += 7) {
      this.weeks.push(allDays.slice(i, i + 7));
    }
  }

  openModal() {
    this.showModal = true;
    this.newEvent = { title: '', date: this.currentMonth.toISOString().split('T')[0], type: 'exam' };
  }

  closeModal() {
    this.showModal = false;
  }

  openDetailModal(event: CalendarEvent) {
    this.selectedEvent = event;
    this.showDetailModal = true;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedEvent = null;
  }

  addEvent() {
    if (this.newEvent.title && this.newEvent.date) {
      const event: CalendarEvent = {
        title: this.newEvent.title,
        date: new Date(this.newEvent.date),
        type: this.newEvent.type
      };
      this.dataService.addCalendarEvent(event);
      this.closeModal();
    }
  }
}
